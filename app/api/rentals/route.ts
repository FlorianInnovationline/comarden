import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RENTALS_FILE = path.join(DATA_DIR, "rental-requests.json");

export interface RentalRequest {
  id: string;
  productId: string;
  productName: string;
  variant: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  duration: number;
  durationUnit: string;
  remarks: string | null;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(RENTALS_FILE)) {
    fs.writeFileSync(RENTALS_FILE, "[]", "utf-8");
  }
}

function readRequests(): RentalRequest[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(RENTALS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeRequests(requests: RentalRequest[]) {
  ensureDataDir();
  fs.writeFileSync(RENTALS_FILE, JSON.stringify(requests, null, 2), "utf-8");
}

export async function GET() {
  const requests = readRequests();
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      productName,
      variant,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      duration,
      durationUnit,
      remarks,
    } = body;

    if (!productId || !customerName || !customerEmail || !customerPhone || !startDate || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const requests = readRequests();

    const newRequest: RentalRequest = {
      id: `rental-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productId,
      productName,
      variant: variant || null,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      duration: Number(duration),
      durationUnit: durationUnit || "jour",
      remarks: remarks || null,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    requests.unshift(newRequest);
    writeRequests(requests);

    return NextResponse.json({ success: true, id: newRequest.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const requests = readRequests();
    const idx = requests.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    requests[idx].status = status;
    writeRequests(requests);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import MgProductPage, { type MgProductContent } from "@/components/shop/mg/MgProductPage";

export const metadata: Metadata = {
  title: "Miofol® 125S — Membrane pare-vapeur renforcée | Comarden",
  description:
    "Miofol® 125S de Meuwissen Gerritsen : membrane pare-vapeur renforcée pour murs et toitures. Spécifications techniques, conditionnement et mise en œuvre. Distribué par Comarden.",
};

const content: MgProductContent = {
  tagline: "Membrane pare-vapeur renforcée pour murs et toitures",
  applications: [
    { icon: "Building2", label: "Pour les murs" },
    { icon: "Home", label: "Pour toiture" },
    { icon: "LayoutGrid", label: "Pour les sols" },
    { icon: "Shield", label: "Pare-vapeur" },
    { icon: "Umbrella", label: "Imperméable à l'eau" },
  ],
  utilisation:
    "Miofol® 125S est utilisé de l'intérieur comme membrane pare-vapeur dans les constructions de murs et de toits. Grâce à sa propriété constante de retardateur de vapeur, Miofol® 125S convient aux constructions de bâtiments appartenant aux classes climatiques 2 et 3, comme les maisons, les bureaux, les écoles, etc. Miofol® 125S est renforcé par un treillis d'armature et peut donc résister à des charges mécaniques élevées, même pendant le transport d'éléments préfabriqués. Miofol® 125S protège la structure contre l'humidité et assure une isolation optimale et étanche à l'air.",
  conditionnement: [
    { description: "Miofol® 125S", largeur: "1,50 m", longueur: "25 m", code: "6112415026", ean: "8714672002683", quantite: "44 rouleaux / palette", poids: "5 kg" },
    { description: "Miofol® 125S", largeur: "1,50 m", longueur: "50 m", code: "6112415010", ean: "8714672000900", quantite: "22 rouleaux / palette", poids: "10 kg" },
    { description: "Miofol® 125S", largeur: "2,00 m", longueur: "50 m", code: "6112420010", ean: "8714672000085", quantite: "22 rouleaux / palette", poids: "13 kg" },
    { description: "Miofol® 125S", largeur: "2,60 m", longueur: "50 m", code: "6112426010", ean: "8714672000092", quantite: "22 rouleaux / palette", poids: "17 kg" },
  ],
  modeEmploi:
    "Appliquez Miofol® 125S sur le côté chaud de la construction du mur et du toit. Fixez le film à la structure sous-jacente à l'aide d'agrafes. Le logo doit être lisible de l'intérieur. Observer 100 mm aux recouvrements horizontaux et verticaux. Pour un contrôle optimal de la vapeur, nous recommandons de sceller les agrafes, les coutures et les recouvrements avec la membrane adhésive basic de VASTR®. Scellez les pénétrations et les connexions de manière étanche au vent et à l'eau à l'aide du ruban VASTR® Butyl ou du ruban Tyvek® FlexWrap.",
  associes: [
    { name: "Tyvek® Bande adhésive FlexWrap", brand: "Tyvek", dims: "60 mm × 10 m", ean: "5450208029771", qty: "3 rouleaux / boîte" },
    { name: "VASTR® Film adhésif basique", brand: "VASTR", dims: "75 mm × 25 m", ean: "8714672002621", qty: "20 rouleaux / boîte" },
    { name: "VASTR® Bande adhésive Butyle", brand: "VASTR", dims: "30 mm × 20 m", ean: "8714672005233", qty: "8 rouleaux / boîte" },
    { name: "VASTR® Bande adhésive Totale (noir)", brand: "VASTR", dims: "60 mm × 25 m", ean: "8714672000474", qty: "10 rouleaux / boîte" },
    { name: "VASTR® Bande adhésive Totale (noir)", brand: "VASTR", dims: "100 mm × 25 m", ean: "8714672000481", qty: "6 rouleaux / boîte" },
    { name: "VASTR® Bande adhésive Totale (blanc)", brand: "VASTR", dims: "60 mm × 25 m", ean: "8714672999884", qty: "10 rouleaux / boîte" },
  ],
};

export default async function Miofol125SPage() {
  const product = await getProductBySlug("miofol-125s");
  if (!product) notFound();
  return <MgProductPage product={product} content={content} />;
}

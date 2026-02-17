// Admin layout - no header/footer, just the admin interface
// This layout is nested inside the root layout but Header/Footer are conditionally hidden

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

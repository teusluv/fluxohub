import { CartDrawer } from "@/components/vitrine/CartDrawer";

export default function TenantLayout({ children, params }: { children: React.ReactNode, params: { tenantSlug: string } }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}

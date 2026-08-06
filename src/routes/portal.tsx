import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Bell, LayoutDashboard } from "lucide-react";

import { ModuleShell, type NavItem } from "@/components/layout/ModuleShell";
import { currentTenant } from "@/lib/domain/seed";

const nav: NavItem[] = [
  { to: "/portal", label: "Inicio", icon: LayoutDashboard },
  { to: "/portal/notificaciones", label: "Notificaciones", icon: Bell, badge: "2" },
];

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal del Cliente — Nexora Platform" },
      { name: "description", content: "Área privada para autogestionar aplicaciones, usuarios, consumo, facturación, soporte y seguridad de tu empresa." },
      { property: "og:title", content: "Portal del Cliente — Nexora Platform" },
      { property: "og:description", content: "Autogestión por tenant con aislamiento estricto de datos y permisos configurables." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortalLayout,
});

function PortalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const context =
    pathname === "/portal/notificaciones"
      ? { titulo: "Notificaciones", subtitulo: "Avisos, alertas de consumo y renovaciones" }
      : { titulo: "Inicio", subtitulo: `${currentTenant.organizacion} · plan ${currentTenant.plan}` };

  return (
    <ModuleShell moduleName="Portal del Cliente" moduleTag={currentTenant.organizacion} nav={nav} context={context}>
      <Outlet />
    </ModuleShell>
  );
}

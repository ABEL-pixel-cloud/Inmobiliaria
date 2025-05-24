export interface sidebarItem {
  label: string;       // Texto visible (ej: "Dashboard")
  iconPath: string;    // Ruta del ícono (ej: "/assets/images/home.png")
  route?: string;      // Ruta de navegación (puede estar ausente si es solo visual)
}
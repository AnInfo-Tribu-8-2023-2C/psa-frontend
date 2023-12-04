import Link from "next/link"
import { useRouter } from "next/router"
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export default function Layout({ children }: { children: any }) {
  //Aqui se agregan los href que refencias los pages de la app
  const menuItems: ISidebarItem[] = [
    {
      href: "/clientes",
      title: "Clientes",
    },
    {
      href: "/usuarios",
      title: "Usuarios",
    },
    {
      href: "/producto",
      title: "Productos",
    },
    {
      href: "/proyectos",
      title: "Proyectos",
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase text-white">
        PSA - Sistema de administración de Proyectos
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="w-full md:w-60" style={{backgroundColor: "black"}}>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.title} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1" style={{backgroundColor: "#F5F5F6", padding: "2rem", display: "flex", justifyContent: "center"}}>{children}</main>
      </div>
    </div>
  )
}

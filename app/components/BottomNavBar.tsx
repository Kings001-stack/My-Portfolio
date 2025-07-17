"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Skill", href: "/skills" },
  { name: "About Me", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#181818] rounded-full px-8 py-3 flex gap-8 shadow-lg border border-gray-700 z-50" style={{minWidth:'320px',maxWidth:'420px'}}>
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className={`flex flex-col items-center group ${pathname === item.href ? "text-primary" : "text-white"}`}> 
          <span className="glow-icon text-lg font-bold group-hover:text-primary transition-colors duration-200">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
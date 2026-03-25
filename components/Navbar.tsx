"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, BookOpen, Info } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  //{ href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center px-8 py-3 bg-white border-b border-gray-200">
      <span className="text-lg font-bold text-gray-900 mr-10">
        AI Literacy Lab
      </span>
      <div className="flex items-center gap-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 text-base rounded-md transition-colors relative
                ${isActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-800"
                }`}
            >
              <Icon size={20} strokeWidth={1.6} />
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/companies", label: "Companies" },
  { href: "/investments", label: "Investments" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="font-semibold">Portfolio</span>
          <nav className="flex gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Log out
          </Button>
        </form>
      </div>
    </header>
  );
}

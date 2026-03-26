"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navConfig, type NavItem } from "@/lib/nav-config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isParentActive = item.items?.some((child) => pathname === child.href);
  const [open, setOpen] = useState(isParentActive || false);

  if (item.items) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
            isParentActive ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {item.title}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
            {item.items.map((child) => (
              <NavItemComponent key={child.href} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground"
      )}
    >
      {item.title}
      {item.label && (
        <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border">
          {item.label}
        </span>
      )}
    </Link>
  );
}

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-0.5">
      {navConfig.items.map((item) => (
        <NavItemComponent key={item.href} item={item} />
      ))}
    </nav>
  );
}

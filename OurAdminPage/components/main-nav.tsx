"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    // {
    //   href: `/${params.storeId}/billboards`,
    //   label: 'Billboards',
    //   active: pathname === `/${params.storeId}/billboards`,
    // },

    {
      href: `/${params.storeId}/products`,
      label: 'Menü',
      active: pathname === `/${params.storeId}/products`,
    },
    // {
    //   href: `/${params.storeId}/categories`,
    //   label: 'Kategorien',
    //   active: pathname === `/${params.storeId}/categories`,
    // },
    {
      href: `/${params.storeId}/qrCodeGenerator`,
      label: 'QR Code Generator',
      active: pathname === `/${params.storeId}/qrCodeGenerator`,
    },
    // {
    //   href: `/${params.storeId}/Tutorial`,
    //   label: 'Tutorials',
    //   active: pathname === `/${params.storeId}/Tutorial`,
    // },
    // {
    //   href: `/${params.storeId}/Angebote`,
    //   label: 'Angebote',
    //   active: pathname === `/${params.storeId}/Angebote`,
    // },
    {
      href: `/${params.storeId}/settings`,
      label: 'Einstellungen',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
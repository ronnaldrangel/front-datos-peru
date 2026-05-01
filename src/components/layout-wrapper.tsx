"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const excludedRoutes = ["/login", "/register", "/forgot-password", "/verify-email", "/reset-password", "/dashboard"];
  const isExcludedPage = excludedRoutes.some(route => 
    pathname === route || (route === "/dashboard" && pathname.startsWith("/dashboard"))
  );

  if (isExcludedPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

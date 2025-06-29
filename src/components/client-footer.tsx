"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

export default function ClientFooter() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/ryhacontentmanagement");

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}

"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function ClientHeader() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/ryhacontentmanagement");

  if (hideHeader) {
    return null;
  }

  return <Header />;
}

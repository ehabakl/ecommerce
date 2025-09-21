"use client";

import { usePathname } from "next/navigation";

export default function SearchInput({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname !== "/") return null;
  return <div className="container w-1/2 mx-auto mt-20 -mb-40">{children}</div>;
}

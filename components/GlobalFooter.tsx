"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function GlobalFooter() {
  const pathname = usePathname();
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/get-data")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content?.contact) {
          setContactData(data.content.contact);
        }
      })
      .catch(() => {});
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Footer contactData={contactData} />;
}

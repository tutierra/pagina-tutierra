"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

interface GlobalFooterProps {
  initialContactData?: any;
}

export default function GlobalFooter({ initialContactData }: GlobalFooterProps) {
  const pathname = usePathname();
  const [contactData, setContactData] = useState<any>(initialContactData || null);

  useEffect(() => {
    fetch("/api/admin/get-data")
      .then((res) => res.json())
      .then((resData) => {
        const content = resData?.content || {};
        const extracted =
          content.contact ||
          content.footer ||
          content.company_info ||
          content.general?.contact ||
          content.general?.footer ||
          null;

        if (extracted) {
          setContactData(extracted);
        }
      })
      .catch(() => {});
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const activeData = contactData || initialContactData;

  return <Footer contactData={activeData} footerData={activeData} company_info={activeData} />;
}

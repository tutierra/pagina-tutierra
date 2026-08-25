import Link from "next/link";
import Logo from "./Logo";
import { CONTACT, SOCIAL } from "@/lib/site-data";

interface FooterProps {
  isUnified?: boolean;
  contactData?: any;
}

export default function Footer({ isUnified = false, contactData }: FooterProps) {
  const contact = {
    phone: contactData?.phone || CONTACT.phone,
    whatsapp: contactData?.whatsapp || CONTACT.whatsapp,
    email: contactData?.email || CONTACT.email,
    address: contactData?.address || CONTACT.address,
    hours: contactData?.hours || CONTACT.hours,
    domain: contactData?.domain || CONTACT.domain,
    instagram: contactData?.instagram || SOCIAL.instagram,
    facebook: contactData?.facebook || SOCIAL.facebook,
    tiktok: contactData?.tiktok || SOCIAL.tiktok,
    youtube: contactData?.youtube || "",
    linkedin: contactData?.linkedin || "",
  };

  return (
    <footer className={isUnified ? "w-full" : "border-t border-brand-gray/10 bg-brand-ink/60"}>
      <div className={isUnified ? "mx-auto w-[90%] py-[2.5%] lg:py-[1.5%]" : "mx-auto w-[90%] py-[5%]"}>
        {!isUnified && (
          <div className="grid grid-cols-1 gap-[3em] md:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
            <div>
              <Logo className="text-[1.2rem] text-brand-gray" />
              <p className="mt-[1.2em] max-w-[28ch] text-[0.9rem] leading-[1.6] text-brand-gray/70">
                Creamos y unimos familias a través de proyectos inmobiliarios sostenibles en el
                Valle Sagrado, Cusco.
              </p>
            </div>

            <div>
              <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green font-semibold uppercase">
                NAVEGACIÓN
              </h3>
              <ul className="flex flex-col gap-[0.7em] text-[0.9rem] text-brand-gray/75">
                <li><Link href="/nosotros" className="transition-colors hover:text-tech-green">Nosotros</Link></li>
                <li><Link href="/proyectos" className="transition-colors hover:text-tech-green">Proyectos</Link></li>
                <li><Link href="/testimonios" className="transition-colors hover:text-tech-green">Testimonios</Link></li>
                <li><Link href="/refiere-y-gana" className="transition-colors hover:text-tech-green">Refiere y Gana</Link></li>
                <li><Link href="/blog" className="transition-colors hover:text-tech-green">Blog</Link></li>
                <li><Link href="/contactanos" className="transition-colors hover:text-tech-green">Contáctanos</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green font-semibold uppercase">
                CONTACTO
              </h3>
              <ul className="flex flex-col gap-[0.8em] text-[0.9rem] text-brand-gray/75">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-tech-green shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{contact.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-tech-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href={`tel:${contact.phone}`} className="transition-colors hover:text-tech-green">
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-tech-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href={`mailto:${contact.email}`} className="transition-colors hover:text-tech-green">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-tech-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{contact.hours}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green font-semibold uppercase">
                REDES SOCIALES
              </h3>
              <ul className="flex flex-col gap-[0.8em] text-[0.9rem] text-brand-gray/75">
                {contact.instagram && (
                  <li>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-tech-green">
                      <svg className="w-4 h-4 text-tech-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </li>
                )}
                {contact.facebook && (
                  <li>
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-tech-green">
                      <svg className="w-4 h-4 text-tech-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                  </li>
                )}
                {contact.tiktok && (
                  <li>
                    <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-tech-green">
                      <svg className="w-4 h-4 text-tech-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.51-1.4 2.51-.12 1.34.46 2.72 1.51 3.5 1.05.8 2.53.94 3.7.35 1.1-.54 1.84-1.67 1.94-2.89.04-2.87.02-5.74.03-8.61 0-2.86-.01-5.72.01-8.58z"/>
                      </svg>
                      <span>TikTok</span>
                    </a>
                  </li>
                )}
                {contact.youtube && (
                  <li>
                    <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-tech-green">
                      <svg className="w-4 h-4 text-tech-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-tech-green">
                      <svg className="w-4 h-4 text-tech-green shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className={isUnified ? "mt-[2em] flex flex-col-reverse items-start justify-between gap-[1em] border-t border-brand-gray/10 pt-[1.5em] text-[0.8rem] text-brand-gray/50 md:flex-row md:items-center" : "mt-[4em] flex flex-col-reverse items-start justify-between gap-[1em] border-t border-brand-gray/10 pt-[2em] text-[0.8rem] text-brand-gray/50 md:flex-row md:items-center"}>
          <span>© {new Date().getFullYear()} Tutierra Grupo Inmobiliario. Todos los derechos reservados.</span>
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-3 md:text-right">
            <span>{contact.domain}</span>
            <span className="hidden md:inline text-brand-gray/20">|</span>
            <span>
              Desarrollado y diseñado por{" "}
              <Link href="/admin" className="hover:text-tech-green transition-colors font-semibold">
                AGENCIA
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

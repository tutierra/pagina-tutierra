import Link from "next/link";
import Logo from "./Logo";
import { CONTACT, SOCIAL } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray/10 bg-brand-ink/60">
      <div className="mx-auto w-[90%] py-[5%]">
        <div className="grid grid-cols-1 gap-[3em] md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-[1.2rem] text-brand-gray" />
            <p className="mt-[1.2em] max-w-[28ch] text-[0.9rem] leading-[1.6] text-brand-gray/70">
              Creamos y unimos familias a través de proyectos inmobiliarios sostenibles en el
              Valle Sagrado, Cusco.
            </p>
          </div>

          <div>
            <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green">
              NAVEGACIÓN
            </h3>
            <ul className="flex flex-col gap-[0.7em] text-[0.9rem] text-brand-gray/75">
              <li><Link href="/nosotros" className="transition-colors hover:text-tech-green">Nosotros</Link></li>
              <li><Link href="/proyectos" className="transition-colors hover:text-tech-green">Proyectos</Link></li>
              <li><Link href="/refiere-y-gana" className="transition-colors hover:text-tech-green">Refiere y Gana</Link></li>
              <li><Link href="/contactanos" className="transition-colors hover:text-tech-green">Contáctanos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green">
              CONTACTO
            </h3>
            <ul className="flex flex-col gap-[0.7em] text-[0.9rem] text-brand-gray/75">
              <li>{CONTACT.address}</li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="transition-colors hover:text-tech-green">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-tech-green">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-[1em] text-[0.85rem] tracking-[0.08em] text-tech-green">
              REDES SOCIALES
            </h3>
            <ul className="flex flex-col gap-[0.7em] text-[0.9rem] text-brand-gray/75">
              <li>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">
                  Facebook
                </a>
              </li>
              <li>
                <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[4em] flex flex-col-reverse items-start justify-between gap-[1em] border-t border-brand-gray/10 pt-[2em] text-[0.8rem] text-brand-gray/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Tutierra Grupo Inmobiliario. Todos los derechos reservados.</span>
          <span>{CONTACT.domain}</span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getPostsContent } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Tutierra Grupo Inmobiliario",
  description:
    "Descubre artículos informativos, guías de compra de terrenos y consejos sobre construcción sostenible en el Valle Sagrado de Cusco.",
};

export default function BlogPage() {
  const posts = getPostsContent();

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50dvh] w-full flex-col justify-center items-center text-center pt-[35%] pb-[8%] md:pt-[15%] md:pb-[4%]">
        <div className="relative mx-auto w-[90%] flex flex-col items-center z-10">
          <Reveal>
            <div className="flex justify-center mb-[1em]">
              <img
                src="/emblem-white.png"
                alt="Tutierra"
                className="h-[3rem] w-auto object-contain"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-[0.5em] max-w-[28ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] text-brand-gray text-center">
              Nuestro <span className="font-serif italic text-tech-green">Blog</span>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-[1.2em] max-w-[54ch] text-[1.1rem] leading-[1.7] text-brand-gray/70">
              Guías, análisis y consejos prácticos para invertir con total seguridad legal en el Valle Sagrado y Cusco.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="pb-[10%]">
        <div className="mx-auto w-[90%]">
          <div className="grid grid-cols-1 gap-[3rem] md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <Reveal key={post.slug} delay={idx * 0.08}>
                <article className="group flex flex-col h-full rounded-[1.2rem] border border-brand-gray/10 bg-white/[0.02] p-[1rem] transition-colors duration-300 hover:bg-white/[0.04]">
                  <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.8rem] block">
                    <Image
                      src={post.imagen}
                      alt={post.titulo}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 mt-[1.2rem]">
                    <div className="flex items-center gap-[0.8rem] text-[0.8rem] text-brand-gray/55">
                      <span>{post.fecha}</span>
                      <span>•</span>
                      <span>{post.tiempoLectura}</span>
                    </div>

                    <h2 className="mt-[0.6rem] font-display text-[1.25rem] font-light leading-[1.3] text-brand-gray group-hover:text-tech-green transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        {post.titulo}
                      </Link>
                    </h2>

                    <p className="mt-[0.8rem] text-[0.92rem] leading-[1.6] text-brand-gray/65 flex-1 line-clamp-3">
                      {post.resumen}
                    </p>

                    <div className="mt-[1.2rem]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-[0.4rem] text-[0.9rem] text-tech-green font-medium group-hover:translate-x-[0.2rem] transition-transform duration-200"
                      >
                        Leer artículo <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <UnifiedContactFooter />
    </>
  );
}

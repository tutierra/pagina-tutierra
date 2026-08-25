import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getPostsContent } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getPostsContent();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPostsContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.titulo} | Blog Tutierra`,
    description: post.resumen,
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative w-full pt-[35%] pb-[6%] md:pt-[12%]">
        <div className="mx-auto w-[90%] max-w-[800px]">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.85rem] text-brand-gray/50 transition-colors hover:text-tech-green"
          >
            ← Volver al blog
          </Link>

          {/* Header */}
          <header className="mt-[1.5em]">
            <div className="flex items-center gap-[0.8rem] text-[0.85rem] text-tech-green">
              <span>{post.fecha}</span>
              <span>•</span>
              <span>Por {post.autor}</span>
              <span>•</span>
              <span>{post.tiempoLectura}</span>
            </div>

            <h1 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] text-brand-gray">
              {post.titulo}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="relative mt-[2.5em] aspect-[16/9] w-full overflow-hidden rounded-[1.2rem] border border-brand-gray/10">
            <Image
              src={post.imagen}
              alt={post.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <div
            className="mt-[3em] text-[1.1rem] leading-[1.8] text-brand-gray/80 
              [&>h3]:text-[1.4rem] [&>h3]:font-display [&>h3]:font-normal [&>h3]:text-brand-gray [&>h3]:mt-[1.8em] [&>h3]:mb-[0.6em]
              [&>p]:mt-[1em] [&>p]:mb-[1em]
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-[1em] [&>ul]:mb-[1em]
              [&>li]:mt-[0.5em]
              [&>strong]:text-brand-gray [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.contenido }}
          />

          {/* Divider */}
          <hr className="my-[4em] border-brand-gray/10" />

          {/* Newsletter Subscription Box */}
          <Reveal>
            <div className="rounded-[1.5rem] bg-white/[0.03] p-[0.5rem] ring-1 ring-white/10 max-w-[600px] mx-auto">
              <div className="rounded-[1.2rem] border border-brand-gray/10 p-[8%] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-center">
                <h2 className="font-display text-[1.4rem] font-light text-brand-gray">
                  Recibe nuestros artículos e invitaciones
                </h2>
                <p className="mt-[0.5em] mb-[1.6em] text-[0.92rem] leading-[1.6] text-brand-gray/65">
                  Suscríbete al newsletter mensual de Tutierra. Te enviaremos nuevos lanzamientos de lotes en el Valle Sagrado, noticias de plusvalía y guías de inversión.
                </p>
                <div className="text-left">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <UnifiedContactFooter />
    </>
  );
}

import { db, initDatabase } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { User, Eye, ArrowLeft, ShieldCheck, Calendar } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  initDatabase();
  const { slug } = await params;
  const article = db.prepare(`SELECT title, summary, thumbnail FROM news_articles WHERE slug = ?`).get(slug) as any;

  if (!article) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${article.title} | MobileCity`,
    description: article.summary,
    openGraph: {
      images: [article.thumbnail],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  initDatabase();
  const { slug } = await params;

  const article = db.prepare(`SELECT * FROM news_articles WHERE slug = ?`).get(slug) as any;

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-6">
        <a href="/" className="hover:text-[#c69a39]">Trang chủ</a>
        <span>/</span>
        <a href="/tin-tuc" className="hover:text-[#c69a39]">Tin tức</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold truncate max-w-xs">{article.title}</span>
      </div>

      <article className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b pb-4">
          <span className="flex items-center gap-1 font-semibold text-gray-700">
            <User size={14} className="text-[#c69a39]" /> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {article.views.toLocaleString()} lượt xem
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {article.createdAt?.slice(0, 10)}
          </span>
        </div>

        {/* Sapo tóm tắt */}
        <div className="bg-yellow-50/70 border-l-4 border-[#c69a39] p-4 text-xs md:text-sm font-medium text-gray-800 leading-relaxed italic">
          {article.summary}
        </div>

        {/* Nội dung bài viết */}
        <div
          className="prose prose-sm max-w-none text-gray-800 space-y-4 leading-relaxed [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-[#c69a39] [&>h2]:mt-6 [&>h2]:mb-2 [&>p]:text-xs [&>p]:md:text-sm [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Khung cam kết hỗ trợ MobileCity */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
          <ShieldCheck size={28} className="text-[#c69a39] flex-shrink-0" />
          <div className="text-xs text-yellow-950">
            <strong>Cần hỗ trợ kỹ thuật trực tiếp?</strong> Quý khách hãy mang máy đến hệ thống showroom
            MobileCity gần nhất để được kỹ thuật viên hỗ trợ kiểm tra và xử lý miễn phí!
          </div>
        </div>

        <div className="pt-4 border-t">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c69a39] hover:underline"
          >
            <ArrowLeft size={14} /> Quay lại danh mục tin tức
          </Link>
        </div>
      </article>
    </main>
  );
}

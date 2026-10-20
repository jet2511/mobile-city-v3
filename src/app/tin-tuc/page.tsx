import { db, initDatabase } from "@/lib/db";
import Link from "next/link";
import { Newspaper, Eye, Calendar, User, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức & Cẩm Nang Công Nghệ, Hướng Dẫn Cài ROM | MobileCity",
  description: "Cập nhật tin tức công nghệ mới nhất, đánh giá điện thoại, hướng dẫn cài ROM Tiếng Việt cho Xiaomi, iPhone tại MobileCity",
};

export default function NewsPage() {
  initDatabase();

  const articles = db.prepare(`SELECT * FROM news_articles ORDER BY createdAt DESC`).all() as any[];

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-6">
        <a href="/" className="hover:text-[#c69a39]">Trang chủ</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Tin tức & Cẩm nang công nghệ</span>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 uppercase flex items-center gap-2">
          <Newspaper size={24} className="text-[#c69a39]" />
          TIN TỨC CÔNG NGHỆ & HƯỚNG DẪN KỸ THUẬT
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Tổng hợp tin tức, đánh giá chuyên sâu và hướng dẫn thủ thuật phần mềm cho smartphone từ MobileCity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            data-testid={`news-item-${art.slug}`}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:border-[#c69a39] hover:shadow-md transition-all group"
          >
            <Link href={`/tin-tuc/${art.slug}`} className="block overflow-hidden bg-gray-50 p-4">
              <img
                src={art.thumbnail}
                alt={art.title}
                className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-2">
                  <span className="flex items-center gap-1 font-medium text-gray-600">
                    <User size={12} className="text-[#c69a39]" /> {art.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {art.views.toLocaleString()} lượt xem
                  </span>
                </div>

                <Link
                  href={`/tin-tuc/${art.slug}`}
                  className="font-extrabold text-base text-gray-900 hover:text-[#c69a39] line-clamp-2 transition-colors"
                >
                  {art.title}
                </Link>
                <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <Link
                  href={`/tin-tuc/${art.slug}`}
                  className="text-xs font-bold text-[#c69a39] hover:underline flex items-center gap-1"
                >
                  Đọc tiếp chi tiết <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

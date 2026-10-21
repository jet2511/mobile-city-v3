"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Star, User, ShieldCheck, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number;
  reply?: string;
  isStaffReply?: boolean;
  createdAt: string;
}

export function ProductComments({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?productId=${productId}`);
      const json = await res.json();
      if (json.success) {
        setComments(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, author, phone, content, rating: 5 }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmittedMessage(true);
        setContent("");
        fetchComments();
        setTimeout(() => setSubmittedMessage(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-6 space-y-6 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-[#0b1c30] uppercase">
          <MessageSquare size={18} className="text-[#8d4b00]" />
          Hỏi Đáp & Đánh Giá Về {productName} ({comments.length})
        </h2>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <span className="ml-1 text-gray-500">5.0 / 5</span>
        </div>
      </div>

      {/* Form gửi câu hỏi */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff] p-4"
      >
        <label htmlFor="comment-content" className="block text-xs font-bold text-[#0b1c30]">
          Bạn có thắc mắc gì về sản phẩm? Hãy để lại bình luận để kỹ thuật viên giải đáp ngay!
        </label>

        <textarea
          id="comment-content"
          data-testid="input-comment-content"
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết câu hỏi của bạn tại đây... (VD: Máy có sẵn hàng tại 120 Thái Hà không shop?)"
          className="w-full rounded-lg border border-[#cbd5e1] bg-white p-3 text-xs text-[#0b1c30] outline-none focus:border-[#8d4b00] focus:ring-1 focus:ring-[#8d4b00]/20"
        />

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            data-testid="input-comment-author"
            required
            aria-label="Họ và tên người bình luận"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Họ và tên của bạn *"
            className="min-w-[180px] flex-1 rounded-lg border border-[#cbd5e1] bg-white p-2.5 text-xs text-[#0b1c30] outline-none focus:border-[#8d4b00]"
          />
          <input
            type="tel"
            data-testid="input-comment-phone"
            aria-label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại (để nhận tin nhắn khi có phản hồi)"
            className="min-w-[180px] flex-1 rounded-lg border border-[#cbd5e1] bg-white p-2.5 text-xs text-[#0b1c30] outline-none focus:border-[#8d4b00]"
          />
          <button
            type="submit"
            data-testid="btn-submit-comment"
            disabled={submitting}
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#8d4b00] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#b15f00]"
          >
            <Send size={13} />
            {submitting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>

        {submittedMessage && (
          <div
            data-testid="comment-success-notice"
            className="pt-1 text-xs font-bold text-emerald-600"
          >
            ✓ Đã gửi câu hỏi thành công! Kỹ thuật viên sẽ phản hồi bạn trong ít phút.
          </div>
        )}
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-4 divide-y divide-[#e2e8f0]">
        {comments.map((c) => (
          <div key={c.id} data-testid={`comment-item-${c.id}`} className="space-y-2 pt-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-[#0b1c30]">
                  {c.author.charAt(0).toUpperCase()}
                </div>
                <strong className="text-[#0b1c30]">{c.author}</strong>
              </div>
              <span className="text-[11px] text-gray-400">{c.createdAt?.slice(0, 10)}</span>
            </div>

            <p className="pl-9 text-gray-700">{c.content}</p>

            {/* Phản hồi từ MobileCity Staff */}
            {c.reply && (
              <div className="mt-2 ml-9 space-y-1 rounded-lg border border-[#fde68a] bg-[#fef3c7]/60 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8d4b00]">
                  <ShieldCheck size={13} className="text-[#d97706]" />
                  Quản Trị Viên MobileCity phản hồi:
                </div>
                <p className="text-xs text-[#0b1c30]">{c.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

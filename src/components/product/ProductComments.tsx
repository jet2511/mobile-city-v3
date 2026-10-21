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

export function ProductComments({ productId, productName }: { productId: string; productName: string }) {
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
    <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-6 my-6">
      <div className="border-b border-[#e2e8f0] pb-3 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#0b1c30] uppercase flex items-center gap-2">
          <MessageSquare size={18} className="text-[#8d4b00]" />
          Hỏi Đáp & Đánh Giá Về {productName} ({comments.length})
        </h2>
        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <span className="text-gray-500 ml-1">5.0 / 5</span>
        </div>
      </div>

      {/* Form gửi câu hỏi */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-[#f8f9ff] p-4 rounded-xl border border-[#e2e8f0]">
        <label htmlFor="comment-content" className="text-xs font-bold text-[#0b1c30] block">
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
          className="w-full text-xs p-3 border border-[#cbd5e1] rounded-lg outline-none focus:border-[#8d4b00] focus:ring-1 focus:ring-[#8d4b00]/20 bg-white text-[#0b1c30]"
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
            className="flex-1 min-w-[180px] text-xs p-2.5 border border-[#cbd5e1] rounded-lg outline-none focus:border-[#8d4b00] bg-white text-[#0b1c30]"
          />
          <input
            type="tel"
            data-testid="input-comment-phone"
            aria-label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại (để nhận tin nhắn khi có phản hồi)"
            className="flex-1 min-w-[180px] text-xs p-2.5 border border-[#cbd5e1] rounded-lg outline-none focus:border-[#8d4b00] bg-white text-[#0b1c30]"
          />
          <button
            type="submit"
            data-testid="btn-submit-comment"
            disabled={submitting}
            className="bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Send size={13} />
            {submitting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>

        {submittedMessage && (
          <div data-testid="comment-success-notice" className="text-xs text-emerald-600 font-bold pt-1">
            ✓ Đã gửi câu hỏi thành công! Kỹ thuật viên sẽ phản hồi bạn trong ít phút.
          </div>
        )}
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-4 divide-y divide-[#e2e8f0]">
        {comments.map((c) => (
          <div key={c.id} data-testid={`comment-item-${c.id}`} className="pt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-[#0b1c30] font-bold flex items-center justify-center text-[11px]">
                  {c.author.charAt(0).toUpperCase()}
                </div>
                <strong className="text-[#0b1c30]">{c.author}</strong>
              </div>
              <span className="text-[11px] text-gray-400">{c.createdAt?.slice(0, 10)}</span>
            </div>

            <p className="text-gray-700 pl-9">{c.content}</p>

            {/* Phản hồi từ MobileCity Staff */}
            {c.reply && (
              <div className="ml-9 mt-2 bg-[#fef3c7]/60 p-3 rounded-lg border border-[#fde68a] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#8d4b00] text-[11px]">
                  <ShieldCheck size={13} className="text-[#d97706]" />
                  Quản Trị Viên MobileCity phản hồi:
                </div>
                <p className="text-[#0b1c30] text-xs">{c.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

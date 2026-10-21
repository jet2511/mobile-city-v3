"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, Clock, Users, Send, CheckCircle2, Award, HeartHandshake } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  type: string;
  deadline: string;
  highlight?: boolean;
}

const JOBS_DATA: Job[] = [
  {
    id: "tech-lead-care",
    title: "Kỹ Thuật Viên Sửa Chữa Phần Cứng / Ép Kính Điện Thoại",
    department: "Khối Kỹ Thuật (MobileCity Care)",
    location: "Hà Nội (Thái Hà / Cầu Giấy) & TP.HCM (Quận 1)",
    salary: "15.000.000₫ - 25.000.000₫",
    type: "Toàn thời gian",
    deadline: "30/11/2026",
    highlight: true,
  },
  {
    id: "sales-executive",
    title: "Chuyên Viên Tư Vấn Bán Hàng Smartphone & Phụ Kiện",
    department: "Khối Bán Lẻ Showroom",
    location: "Toàn hệ thống (Hà Nội, Đà Nẵng, TP.HCM)",
    salary: "10.000.000₫ - 18.000.000₫ + Thưởng doanh số",
    type: "Toàn thời gian / Xoay ca",
    deadline: "25/11/2026",
    highlight: false,
  },
  {
    id: "content-reviewer",
    title: "Reviewer Công Nghệ & Biên Tập Viên Tin Tức / Video TikTok - Youtube",
    department: "Khối Truyền Thông & Marketing",
    location: "Trụ sở chính: Thái Hà, Hà Nội",
    salary: "12.000.000₫ - 20.000.000₫",
    type: "Toàn thời gian",
    deadline: "15/12/2026",
    highlight: true,
  },
  {
    id: "customer-service",
    title: "Nhân Viên Chăm Sóc Khách Hàng & Xử Lý Đơn Hàng Online",
    department: "Khối Thương Mại Điện Tử",
    location: "Hà Nội",
    salary: "8.500.000₫ - 12.000.000₫",
    type: "Toàn thời gian",
    deadline: "20/11/2026",
    highlight: false,
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string>("tech-lead-care");
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidatePhone) {
      alert("Vui lòng điền đủ họ tên và số điện thoại!");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="bg-[#0b1c30] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden border border-[#213145]">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase px-3.5 py-1 rounded-full border border-amber-400/30">
            <Users size={14} />
            Gia Nhập Đội Ngũ MobileCity
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Cơ Hội Nghề Nghiệp & Tỏa Sáng Đam Mê Công Nghệ
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Môi trường năng động, trẻ trung, tiếp xúc với những siêu phẩm smartphone đầu tiên trên thị trường cùng chế độ đãi ngộ và lộ trình thăng tiến rõ ràng.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
              <Award size={16} className="text-amber-400" />
              Lương thưởng hấp dẫn theo năng lực
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
              <HeartHandshake size={16} className="text-emerald-400" />
              Đào tạo nghề sửa chữa chuyên sâu
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Job List + Fast Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Job Openings */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black text-[#0b1c30] flex items-center gap-2">
            <Briefcase size={20} className="text-[#994700]" />
            Vị Trí Đang Tuyển Dụng Nổi Bật ({JOBS_DATA.length})
          </h2>

          <div className="space-y-4">
            {JOBS_DATA.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                  selectedJob === job.id
                    ? "bg-amber-50/40 border-[#994700] ring-2 ring-[#994700]/20 shadow-sm"
                    : "bg-white border-[#e2e8f0] hover:border-gray-300 shadow-sm"
                }`}
              >
                {job.highlight && (
                  <span className="absolute top-0 right-0 bg-[#994700] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Tuyển Gấp
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {job.department}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#0b1c30]">{job.title}</h3>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-600 pt-2">
                    <span className="flex items-center gap-1.5 font-bold text-[#994700]">
                      <DollarSign size={15} />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-gray-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} className="text-gray-400" />
                      Hạn nộp: {job.deadline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Fast Apply Form */}
        <div>
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 sticky top-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#994700]">Ứng Tuyển Nhanh</span>
              <h3 className="text-xl font-black text-[#0b1c30] mt-1">Gửi Hồ Sơ Ngay</h3>
              <p className="text-xs text-gray-500 mt-1">
                Bộ phận nhân sự MobileCity sẽ liên hệ phỏng vấn trong 24 giờ làm việc.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Nộp Hồ Sơ Thành Công!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Cảm ơn bạn {candidateName}. MobileCity đã ghi nhận thông tin ứng tuyển cho vị trí này.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#994700] underline font-bold mt-2 inline-block cursor-pointer"
                >
                  Gửi hồ sơ khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Vị trí ứng tuyển</label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#994700]"
                  >
                    {JOBS_DATA.map((j) => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Họ và tên của bạn</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trần Minh Đức"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#994700]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Số điện thoại liên hệ</label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#994700]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Link CV / Portfolio (nếu có)</label>
                  <input
                    type="text"
                    placeholder="Google Drive, TopCV, LinkedIn..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#994700]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#994700] hover:bg-[#803b00] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send size={15} />
                  <span>Gửi Ứng Tuyển Nhanh</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

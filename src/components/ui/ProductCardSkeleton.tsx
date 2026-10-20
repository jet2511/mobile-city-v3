import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-3.5 animate-pulse flex flex-col space-y-3">
      <div className="w-full h-44 bg-slate-100 rounded-lg" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 w-16 bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 rounded" />
      </div>
      <div className="pt-2 space-y-2">
        <div className="h-5 w-24 bg-slate-100 rounded" />
        <div className="h-6 w-full bg-slate-100 rounded" />
      </div>
    </div>
  );
}

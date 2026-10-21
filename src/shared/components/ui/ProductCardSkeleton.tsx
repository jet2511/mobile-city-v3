import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col space-y-3 rounded-lg border border-[#e2e8f0] bg-white p-3.5">
      <div className="h-44 w-full rounded-lg bg-slate-100" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-16 rounded bg-slate-100" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-3/4 rounded bg-slate-100" />
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-5 w-24 rounded bg-slate-100" />
        <div className="h-6 w-full rounded bg-slate-100" />
      </div>
    </div>
  );
}

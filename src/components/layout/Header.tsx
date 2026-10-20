"use client";

import React from "react";
import { HeaderTop } from "./HeaderTop";
import { HeaderMain } from "./HeaderMain";
import { MegaMenu } from "./MegaMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      <HeaderTop />
      <HeaderMain />
      <MegaMenu />
    </header>
  );
}

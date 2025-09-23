"use client";
import Link from "next/link";
import { X } from "lucide-react";

const SearchFormResetBtn = () => {
  const reset = function () {
    const form = document.querySelector(".search-form");
    if (form) {
      (form as HTMLFormElement).reset();
    }
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormResetBtn;

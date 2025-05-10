"use client"; // Next.js App Router에서는 클라이언트 컴포넌트에 명시

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white text-gray-800 p-4 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold hover:text-gray-600 transition-colors"
        >
          더블체크
        </Link>
        <div>
          <Link
            href="/"
            className="px-3 py-2 hover:text-gray-600 transition-colors rounded-md text-sm sm:text-base"
          >
            메인
          </Link>
          <Link
            href="/policy-check"
            className="px-3 py-2 hover:text-gray-600 transition-colors rounded-md text-sm sm:text-base"
          >
            정책 체크
          </Link>
          <Link
            href="/news-check"
            className="px-3 py-2 hover:text-gray-600 transition-colors rounded-md text-sm sm:text-base"
          >
            뉴스 체크
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
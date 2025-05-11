"use client";

const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 text-gray-500 text-sm">
        <p className="mb-1">더블체크 - 2025 대선 후보 정책 비교 (데모)</p>
        <p>
          본 서비스의 정책 정보는 선관위 공약 페이지(
          <a
            href="https://policy.nec.go.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            policy.nec.go.kr
          </a>
          ) 등 공식 자료를 기반으로 합니다.
        </p>
        <div className="mt-4 space-x-2">
          <Link href="/privacy-policy" className="text-gray-600 hover:underline">
            개인정보처리방침
          </Link>
          <span className="text-gray-400">·</span>
          <Link href="/terms-of-service" className="text-gray-600 hover:underline">
            이용약관
          </Link>
        </div>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Double Check. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
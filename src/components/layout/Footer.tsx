"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-gray-600 hover:underline"
            >
              개인정보처리방침
            </button>
            <span className="text-gray-400">·</span>
            <button
              onClick={() => setIsTermsOpen(true)}
              className="text-gray-600 hover:underline"
            >
              이용약관
            </button>
          </div>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Double Check. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Dialog
        open={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              개인정보처리방침
            </Dialog.Title>
            <div className="prose prose-sm">
              {/* Privacy policy content would go here */}
              <p>개인정보처리방침 내용은 관리자에 의해 업데이트될 예정입니다.</p>
            </div>
            <button
              className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsPrivacyOpen(false)}
            >
              닫기
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              이용약관
            </Dialog.Title>
            <div className="prose prose-sm">
              {/* Terms of service content would go here */}
              <p>이용약관 내용은 관리자에 의해 업데이트될 예정입니다.</p>
            </div>
            <button
              className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsTermsOpen(false)}
            >
              닫기
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Footer;
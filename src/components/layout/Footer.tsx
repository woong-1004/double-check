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
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
              개인정보처리방침
            </Dialog.Title>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-6">
                더블체크(이하 "사이트")는 『개인정보 보호법』 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같은 개인정보처리방침을 수립·공개합니다. 본 방침은 사이트가 운영하는 더블체크.한국 웹사이트(이하 "더블체크")에 적용됩니다.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. 개인정보의 수집 항목 및 수집 방법</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>수집 항목: 이메일 주소</li>
                <li>수집 방법: 웹사이트 하단의 뉴스레터 구독 신청 양식을 통한 수집</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>뉴스레터 발송 및 서비스 관련 정보 제공</li>
                <li>구독자 대상의 서비스 안내 및 업데이트 공지</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>구독 해지 요청 시 즉시 파기</li>
                <li>보관 기간을 별도로 동의 받은 경우 해당 기간 동안 보관</li>
                <li>관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>이용자가 사전에 제3자 제공에 동의한 경우</li>
                <li>법령에 의거하거나 수사기관의 요청에 따른 경우</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. 개인정보 처리의 위탁</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>수탁자: (예: Mailchimp, 스티비 등 이메일 발송 서비스)</li>
                <li>위탁 업무 내용: 이메일 뉴스레터 자동 발송 시스템 운영</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. 이용자의 권리 및 행사 방법</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>언제든지 개인정보 열람, 정정, 삭제, 처리정지 가능</li>
                <li>구독 해지는 사이트 내 기능 또는 아래 문의처 이용</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. 개인정보의 파기 절차 및 방법</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>파기 절차: 목적 달성 후 즉시 삭제</li>
                <li>파기 방법: 복구 불가능한 방식으로 영구 삭제</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. 개인정보 보호책임자</h2>
              <ul className="list-disc pl-5 mb-6">
                <li>성명/닉네임: 정세웅 / worldiswoong</li>
                <li>이메일: worldiswoong@gmail.com</li>
                <li>인스타그램 DM: @worldiswoong</li>
                <li>문의 가능 시간: 평일 09:00~18:00</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. 고지의 의무</h2>
              <p className="mb-4">본 방침은 관련 법령 및 정책 변경 시 사전 공지됩니다.</p>
              <ul className="list-disc pl-5 mb-6">
                <li>공고일자: 2025년 5월 12일</li>
                <li>시행일자: 2025년 5월 13일</li>
              </ul>
            </div>
            <button
              className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
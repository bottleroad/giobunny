import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

export const metadata = {
  title: '제주 한달살기 | 편안한 휴식과 새로운 경험',
  description: '제주도에서의 한달살기를 위한 최적의 숙소와 정보를 제공합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 카카오 지도 API 스크립트는 Contact 컴포넌트에서 동적으로 로드됩니다. */}
        {/* 아래 YOUR_KAKAO_API_KEY 부분을 발급받은 JavaScript 키로 변경하세요 */}
        {/* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY" /> */}
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 
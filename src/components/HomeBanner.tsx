"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HomeBanner = () => {
  // 텍스트 애니메이션 변형
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 1.2,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative w-full h-screen">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/jeju-banner.jpg')",
          backgroundSize: "cover"
        }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>
      
      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <motion.div
          className="text-center space-y-6 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            variants={itemVariants}
          >
            제주도의 아름다운 풍경과 함께하는 완벽한 휴식
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            variants={itemVariants}
          >
            제주 바다가 보이는 프라이빗 한 공간에서 특별한 추억을 만들어보세요
          </motion.p>
          
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href="/booking" passHref>
              <span 
                className="inline-block bg-jeju-orange hover:bg-jeju-orange-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-colors cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label="예약하기 페이지로 이동"
              >
                지금 예약하기
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeBanner; 
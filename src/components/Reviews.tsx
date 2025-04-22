"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviewsData = [
  {
    id: 1,
    name: "김지현",
    date: "2023-04-15",
    rating: 5,
    text: "정말 아름다운 곳이었어요! 바다 뷰가 환상적이었고, 집 내부도 깨끗하고 아늑했습니다. 호스트님도 친절하셔서 다음에 제주도 오면 또 방문하고 싶어요."
  },
  {
    id: 2,
    name: "이승우",
    date: "2023-05-22",
    rating: 5,
    text: "조용히 휴식을 취하기에 완벽한 장소였습니다. 아침에 테라스에서 커피 한 잔 마시며 바다를 보는 것이 하루의 시작으로 최고였어요. 시설도 잘 갖춰져 있어 불편함 없이 지냈습니다."
  },
  {
    id: 3,
    name: "박민지",
    date: "2023-06-10",
    rating: 4,
    text: "전반적으로 만족스러웠습니다. 위치가 조금 외진 감이 있었지만, 그만큼 프라이버시가 보장되어 좋았어요. 다음에는 좀 더 긴 일정으로 방문하고 싶네요."
  },
  {
    id: 4,
    name: "최준호",
    date: "2023-07-05",
    rating: 5,
    text: "가족 여행으로 방문했는데, 아이들도 너무 좋아했어요. 넓은 공간과 아름다운 풍경이 인상적이었습니다. 주변에 관광지도 가까워서 여행하기 편했습니다."
  },
  {
    id: 5,
    name: "정수미",
    date: "2023-08-12",
    rating: 5,
    text: "친구들과 함께 갔는데 정말 좋았어요! 바베큐 시설도 잘 되어있고, 바다가 보이는 뷰에서 먹는 저녁은 정말 잊을 수 없는 경험이었습니다. 강력 추천합니다!"
  }
];

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 자동 슬라이드 효과
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentReview((prev) => (prev + 1) % reviewsData.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentReview, isAutoPlay]);

  // 이전 리뷰로 이동
  const handlePrev = () => {
    setIsAutoPlay(false);
    setDirection(-1);
    setCurrentReview((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // 다음 리뷰로 이동
  const handleNext = () => {
    setIsAutoPlay(false);
    setDirection(1);
    setCurrentReview((prev) => (prev + 1) % reviewsData.length);
  };

  // 별점 렌더링 함수
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  // 슬라이드 애니메이션 변형
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          고객님들의 소중한 후기
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* 리뷰 슬라이더 */}
          <div className="overflow-hidden relative rounded-lg bg-white shadow-lg p-8">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentReview}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="py-8"
              >
                <div className="flex justify-center mb-6">
                  <FaQuoteLeft className="text-4xl text-jeju-orange opacity-30" />
                </div>
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-600 italic mb-6">
                    "{reviewsData[currentReview].text}"
                  </p>
                  <div className="flex justify-center mb-2">
                    {renderStars(reviewsData[currentReview].rating)}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {reviewsData[currentReview].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {reviewsData[currentReview].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="bg-white p-2 rounded-full shadow-md text-gray-800 focus:outline-none hover:bg-gray-100 transition-colors"
                aria-label="이전 리뷰"
                tabIndex={0}
              >
                <FaChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="bg-white p-2 rounded-full shadow-md text-gray-800 focus:outline-none hover:bg-gray-100 transition-colors"
                aria-label="다음 리뷰"
                tabIndex={0}
              >
                <FaChevronRight size={24} />
              </motion.button>
            </div>
          </div>

          {/* 인디케이터 닷 */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviewsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlay(false);
                  setDirection(index > currentReview ? 1 : -1);
                  setCurrentReview(index);
                }}
                className="focus:outline-none"
                whileHover={{ scale: 1.2 }}
                aria-label={`리뷰 ${index + 1}로 이동`}
                tabIndex={0}
              >
                <div 
                  className={`h-3 w-3 rounded-full ${
                    currentReview === index 
                      ? "bg-jeju-orange" 
                      : "bg-gray-300"
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 
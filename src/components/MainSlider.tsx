"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: '/images/jeju-slide-1.jpg',
    title: '제주에서의 특별한 한달살기',
    subtitle: '바다가 보이는 아늑한 공간에서 일상을 떠나 새로운 경험을 시작하세요',
  },
  {
    id: 2,
    image: '/images/jeju-slide-2.jpg',
    title: '제주 자연과 함께하는 시간',
    subtitle: '오름, 바다, 그리고 제주의 아름다운 풍경이 당신을 기다립니다',
  },
  {
    id: 3,
    image: '/images/jeju-slide-3.jpg',
    title: '편안한 휴식과 재충전',
    subtitle: '모던하고 깨끗한 시설에서 편안한 휴식을 경험하세요',
  },
];

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Placeholder div for image - would be replaced with actual images */}
          <div 
            className="relative w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
             }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg">
              {slide.subtitle}
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="bg-jeju-blue hover:bg-jeju-deep-blue text-white font-bold py-3 px-8 rounded-md shadow-lg transition-colors duration-300"
              >
                예약 문의하기
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10"
        onClick={prevSlide}
        aria-label="이전 슬라이드"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10"
        onClick={nextSlide}
        aria-label="다음 슬라이드"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSlider; 
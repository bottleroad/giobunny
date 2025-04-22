"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

// 갤러리 이미지 목록 (실제 파일명과 일치하도록 수정)
const galleryImages = [
  { id: 1, category: 'surroundings', src: '/images/gallery/gallery-1.jpg', alt: '넓은 거실 공간', title: '객실 인테리어' },
  { id: 2, category: 'view', src: '/images/gallery/gallery-2.jpg', alt: '편안한 침실', title: '객실 인테리어' },
  { id: 3, category: 'interior', src: '/images/gallery/gallery-3.jpg', alt: '현대적인 주방', title: '모던한 주방' },
  { id: 4, category: 'interior', src: '/images/gallery/gallery-4.jpg', alt: '깨끗한 욕실', title: '깨끗한 욕실' },
  { id: 5, category: 'interior', src: '/images/gallery/gallery-5.jpg', alt: '바다가 보이는 발코니', title: '바다가 보이는 발코니' },
  { id: 6, category: 'interior', src: '/images/gallery/gallery-6.jpg', alt: '창문에서 보이는 바다 전경', title: '창문에서 보이는 바다 전경' },
  { id: 7, category: 'interior', src: '/images/gallery/gallery-7.jpg', alt: '아름다운 제주 일몰', title: '아름다운 제주 일몰' },
  { id: 8, category: 'view', src: '/images/gallery/gallery-8.jpg', alt: '주변 환경', title: '주변 환경' },
  { id: 9, category: 'interior', src: '/images/gallery/gallery-9.jpg', alt: '걸어서 5분 거리의 카페', title: '걸어서 5분 거리의 카페' },
];

// 갤러리 카테고리
const categories = [
  { id: 'all', label: '전체' },
  { id: 'interior', label: '내부' },
  { id: 'view', label: '전망' },
  { id: 'surroundings', label: '주변 환경' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 선택된 카테고리에 따라 이미지 필터링
  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  // 이미지 확대 보기 열기
  const handleOpenLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  // 이미지 확대 보기 닫기
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  // 이전 이미지로 이동
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  // 다음 이미지로 이동
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  return (
    <div className="space-y-8">
      {/* 카테고리 필터 */}
      <AnimatedSection>
        <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0">
          {categories.map((category) => (
            <motion.button 
              key={category.id}
              className={`px-4 py-2 rounded-full transition ${selectedCategory === category.id ? 'bg-jeju-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </AnimatedSection>
      
      {/* 갤러리 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredImages.map((image, index) => (
          <AnimatedSection 
            key={image.id} 
            delay={0.1 * (index % 3)} 
            direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
          >
            <motion.div 
              className="overflow-hidden rounded-lg cursor-pointer shadow-md transform transition"
              onClick={() => handleOpenLightbox(image.id)}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
              }}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transform transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <p className="p-3 text-white text-sm">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
      
      {/* 라이트박스 모달 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" 
            onClick={handleCloseLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* 현재 선택된 이미지 */}
              {filteredImages.find(img => img.id === selectedImage) && (
                <>
                  <div className="relative h-[80vh] max-h-[80vh] w-auto">
                    <Image
                      src={filteredImages.find(img => img.id === selectedImage)!.src}
                      alt={filteredImages.find(img => img.id === selectedImage)!.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center bg-black bg-opacity-40">
                    {filteredImages.find(img => img.id === selectedImage)!.alt}
                  </div>
                </>
              )}
              
              {/* 이전/다음 버튼 */}
              <motion.button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 hover:bg-opacity-50 text-white p-4 rounded-full ml-2"
                onClick={handlePrevImage}
                aria-label="이전 이미지"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.9 }}
              >
                &lt;
              </motion.button>
              <motion.button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 hover:bg-opacity-50 text-white p-4 rounded-full mr-2"
                onClick={handleNextImage}
                aria-label="다음 이미지"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.9 }}
              >
                &gt;
              </motion.button>
              
              {/* 닫기 버튼 */}
              <motion.button 
                className="absolute top-0 right-0 bg-white bg-opacity-25 hover:bg-opacity-50 text-white p-2 rounded-full m-2"
                onClick={handleCloseLightbox}
                aria-label="닫기"
                whileHover={{ rotate: 90, backgroundColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery; 
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaSun } from 'react-icons/fa';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const features = [
    {
      icon: <FaLeaf className="text-green-500" size={30} />,
      title: '자연 친화적',
      description: '자연과 하나가 되는 편안한 공간에서 일상의 스트레스를 잊어보세요.'
    },
    {
      icon: <FaHeart className="text-red-500" size={30} />,
      title: '편안함과 안락함',
      description: '모든 편의시설이 갖춰진 안락한 공간에서 휴식을 취하실 수 있습니다.'
    },
    {
      icon: <FaSun className="text-yellow-500" size={30} />,
      title: '환상적인 뷰',
      description: '제주도의 아름다운 자연 경관을 객실에서 바로 감상하실 수 있습니다.'
    }
  ];

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">제주 메이트 하우스</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            제주도의 아름다운 자연과 함께하는 특별한 공간에서 잊지 못할 추억을 만들어보세요.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            className="lg:w-1/2"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/jeju-house.jpg"
                alt="제주 메이트 하우스 외관"
                fill
                style={{objectFit: "cover"}}
                className="hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              특별한 공간, 특별한 경험
            </motion.h3>

            <motion.p 
              className="text-gray-600 mb-8"
              variants={itemVariants}
            >
              제주 메이트 하우스는 제주도의 아름다운 자연 속에 위치한 프리미엄 숙소입니다. 
              바다가 보이는 전망과 함께 편안하고 모던한 인테리어로 꾸며진 공간에서 
              여러분의 여행이 더욱 특별해질 것입니다. 가족, 연인, 친구들과 함께 
              제주도의 자연을 느끼며 잊지 못할 추억을 만들어보세요.
            </motion.p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
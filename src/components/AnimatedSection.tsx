"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0.2,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 화면에 보이면 애니메이션 활성화
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // 방향에 따른 애니메이션 설정
  const getAnimationVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={getAnimationVariants()}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0] // 부드러운 애니메이션
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedSection; 
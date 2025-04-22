"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { 
  FaWifi, FaParking, FaAirFreshener, FaTv, FaThermometerHalf, 
  FaUtensils, FaBath, FaWater, FaCoffee, FaKey, FaShieldAlt, FaFireExtinguisher
} from 'react-icons/fa';

// 시설 정보
const facilityItems = [
  { id: 1, icon: <FaWifi size={24} />, title: '무료 와이파이', description: '초고속 인터넷 제공' },
  { id: 2, icon: <FaParking size={24} />, title: '무료 주차', description: '2대 주차 가능' },
  { id: 3, icon: <FaAirFreshener size={24} />, title: '에어컨', description: '쾌적한 환경 유지' },
  { id: 4, icon: <FaTv size={24} />, title: 'TV', description: '넷플릭스, 케이블 TV 제공' },
  { id: 5, icon: <FaThermometerHalf size={24} />, title: '난방', description: '바닥 난방 시스템' },
  { id: 6, icon: <FaUtensils size={24} />, title: '주방', description: '기본 조리도구 구비' },
  { id: 7, icon: <FaBath size={24} />, title: '욕실용품', description: '수건, 샴푸, 바디워시 제공' },
  { id: 8, icon: <FaWater size={24} />, title: '온수', description: '24시간 온수 사용 가능' },
  { id: 9, icon: <FaCoffee size={24} />, title: '커피/차', description: '커피와 차 구비' },
  { id: 10, icon: <FaKey size={24} />, title: '셀프 체크인', description: '스마트 도어락 설치' },
  { id: 11, icon: <FaShieldAlt size={24} />, title: '보안 카메라', description: '건물 외부 보안 카메라 설치' },
  { id: 12, icon: <FaFireExtinguisher size={24} />, title: '소화기', description: '화재 안전 장비 구비' },
];

const Facilities = () => {
  return (
    <AnimatedSection className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-jeju-blue">숙소 시설 안내</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilityItems.map((item, index) => (
          <AnimatedSection 
            key={item.id} 
            delay={0.1 * (index % 3)} 
            direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
          >
            <motion.div 
              className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex-shrink-0 mr-4 text-jeju-blue">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Facilities; 
"use client";

import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaCalendarAlt, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Contact = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<boolean>(false);

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return false;
    }
    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    if (!phone.trim()) {
      setError('연락처를 입력해주세요.');
      return false;
    }
    if (!message.trim()) {
      setError('문의내용을 입력해주세요.');
      return false;
    }
    setError(null);
    return true;
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setError(null);
    setServerError(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setServerError(false);
      
      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setServerError(true);
        throw new Error(data.message || '문의 접수 중 오류가 발생했습니다.');
      }
      
      // Success - reset form & show success message
      resetForm();
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '문의 접수 중 오류가 발생했습니다.');
      console.error('문의 제출 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setter(e.target.value);
    if (error) setError(null);
    if (serverError) setServerError(false);
  };

  // 간단한 useEffect - 불필요한 맵 관련 코드 제거
  useEffect(() => {
    // 페이지 로드 시 간단한 초기화 작업만 수행
    const mapSection = document.getElementById('map-section');
    
    // 추가 초기화 작업이 필요하면 여기에 작성
    
    return () => {
      // Cleanup 코드 (필요시)
    };
  }, []);

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">문의하기</h2>
            <p className="text-gray-600">제주한달살기에 대해 궁금한 점이 있으시면 문의해주세요.</p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="bg-white rounded-lg shadow-md p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center h-full py-10"
                >
                  <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">문의가 접수되었습니다!</h3>
                  <p className="text-gray-600 text-center">
                    문의주셔서 감사합니다. 빠른 시일 내에 답변 드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className={`p-4 rounded-md mb-4 flex items-start ${serverError ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      <div className="flex-shrink-0 mr-3 mt-0.5">
                        <FaExclamationCircle className={serverError ? 'text-red-500' : 'text-yellow-500'} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">
                          {serverError ? '서버 오류' : '입력 오류'}
                        </h3>
                        <p className="text-sm">{error}</p>
                        {serverError && (
                          <p className="text-xs mt-1">
                            서버 문제로 이메일 전송에 실패했습니다. 잠시 후 다시 시도하거나 직접 이메일로 문의해주세요.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUserAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="홍길동"
                        value={name}
                        onChange={handleChange(setName)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                        value={email}
                        onChange={handleChange(setEmail)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="010-1234-5678"
                        value={phone}
                        onChange={handleChange(setPhone)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      문의내용 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MdMessage className="text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        rows={5}
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="문의 내용을 입력해주세요."
                        value={message}
                        onChange={handleChange(setMessage)}
                        disabled={isLoading}
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        전송 중...
                      </span>
                    ) : '문의하기'}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    * 입력하신 정보는 담당자 이메일로 전송됩니다.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
          
          {/* Contact Info (대체된 지도 섹션) */}
          <AnimatedSection direction="right" delay={0.5}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">제주한달살기 안내</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">위치 안내</h4>
                    <p className="text-gray-600">제주특별자치도 제주시</p>
                    <p className="text-gray-600 mt-1">제주공항에서 차량으로 약 30분 거리</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">연락처</h4>
                    <p className="text-gray-600">전화: 064-123-4567</p>
                    <p className="text-gray-600">이메일: giobunny@giobunny.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">예약 안내</h4>
                    <p className="text-gray-600">최소 1주일 전 예약 필수</p>
                    <p className="text-gray-600">한달 살기 특별 할인 제공</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <FaClock className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">운영 시간</h4>
                    <p className="text-gray-600">문의 응대: 평일 09:00 - 18:00</p>
                    <p className="text-gray-600">체크인: 15:00 / 체크아웃: 11:00</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(Contact), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">
    <p className="text-gray-500">문의 폼 로딩 중...</p>
  </div>
}); 
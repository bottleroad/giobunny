"use client";

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-teal-800 text-white pt-16 pb-8" id="footer">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* 회사 정보 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 border-b border-teal-600 pb-2">GIOBUNNY</h3>
            <p className="text-gray-300 mb-6">
              제주도의 아름다운 자연과 함께하는 특별한 숙박 경험을 제공합니다. 
              편안함, 아름다움, 그리고 특별한 추억을 만들어 드립니다.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </motion.div>

          {/* 퀵 링크 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 border-b border-teal-600 pb-2">바로가기</h3>
            <ul className="space-y-2">
              {[
                { name: '홈', href: '#hero' },
                { name: '숙소개', href: '#usage' },
                { name: '객실', href: '#rooms' },
                { name: '시설', href: '#amenities' },
                { name: '후기', href: '#reviews' },
                { name: '연락처', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 연락처 정보 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 border-b border-teal-600 pb-2">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">제주특별자치도 제주시 애월읍 하귀동 12-3</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-teal-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">064-123-4567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-teal-400 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@jejumatehouse.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  info@jejumatehouse.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 저작권 정보 */}
        <div className="border-t border-teal-700 pt-6 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} 제주 메이트 하우스 | 모든 권리 보유</p>
          <div className="mt-3 flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">개인정보 처리방침</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">이용약관</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors duration-200">사이트맵</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
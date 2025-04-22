"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: '홈', href: '#hero' },
  { name: '소개', href: '#about' },
  { name: '객실', href: '#rooms' },
  { name: '시설', href: '#amenities' },
  { name: '후기', href: '#reviews' },
  { name: '연락처', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치에 따라 배경색 변경
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 현재 활성화된 섹션 감지
      const sections = navLinks.map(link => link.href.substring(1));
      const currentPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    closeMenu();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            href="#hero"
            className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition"
          >
            GIOBUNNY
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-teal-600' 
                      : scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-gray-800 hover:text-teal-600'
                  }`}
                  onClick={() => handleNavLinkClick(sectionId)}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-teal-600"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button 
            className="flex md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isOpen ? (
              <FaTimes size={24} className="text-gray-800" />
            ) : (
              <FaBars size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const sectionId = link.href.substring(1);
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`py-2 px-4 rounded-md ${
                        isActive 
                          ? 'bg-teal-50 text-teal-600' 
                          : 'text-gray-800 hover:bg-gray-100'
                      }`}
                      onClick={() => handleNavLinkClick(sectionId)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 
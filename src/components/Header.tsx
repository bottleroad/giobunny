"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 이벤트를 감지하여 헤더 스타일 변경
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 공통 스크롤 링크 속성
  const scrollLinkProps = {
    spy: true,
    smooth: true,
    offset: -70,
    duration: 700,
    activeClass: "text-jeju-blue",
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-jeju-deep-blue' : 'text-jeju-deep-blue'
            }`}>GIOBUNNY</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <ScrollLink 
              to="accommodation" 
              {...scrollLinkProps}
              className={`cursor-pointer font-medium transition-all duration-300 hover:text-jeju-blue ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              숙소 소개
            </ScrollLink>
            <ScrollLink 
              to="usage" 
              {...scrollLinkProps}
              className={`cursor-pointer font-medium transition-all duration-300 hover:text-jeju-blue ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              이용 안내
            </ScrollLink>
            <ScrollLink 
              to="rental" 
              {...scrollLinkProps}
              className={`cursor-pointer font-medium transition-all duration-300 hover:text-jeju-blue ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              임대 정책
            </ScrollLink>
            <ScrollLink 
              to="gallery" 
              {...scrollLinkProps}
              className={`cursor-pointer font-medium transition-all duration-300 hover:text-jeju-blue ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              갤러리
            </ScrollLink>
            <ScrollLink 
              to="faq" 
              {...scrollLinkProps}
              className={`cursor-pointer font-medium transition-all duration-300 hover:text-jeju-blue ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              FAQ
            </ScrollLink>
            <ScrollLink 
              to="contact" 
              {...scrollLinkProps}
              className={`btn-primary transition-transform duration-300 hover:scale-105 cursor-pointer ${
                scrolled ? '' : 'bg-jeju-deep-blue'
              }`}
            >
              예약 문의
            </ScrollLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-700 hover:text-jeju-blue"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full animate-slideDown">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-1 bg-white shadow-lg">
            <ScrollLink
              to="accommodation"
              {...scrollLinkProps}
              className="px-3 py-2 text-gray-700 hover:text-jeju-blue hover:bg-gray-50 font-medium rounded-md cursor-pointer"
              onClick={closeMenu}
            >
              숙소 소개
            </ScrollLink>
            <ScrollLink
              to="usage"
              {...scrollLinkProps}
              className="px-3 py-2 text-gray-700 hover:text-jeju-blue hover:bg-gray-50 font-medium rounded-md cursor-pointer"
              onClick={closeMenu}
            >
              이용 안내
            </ScrollLink>
            <ScrollLink
              to="rental"
              {...scrollLinkProps}
              className="px-3 py-2 text-gray-700 hover:text-jeju-blue hover:bg-gray-50 font-medium rounded-md cursor-pointer"
              onClick={closeMenu}
            >
              임대 정책
            </ScrollLink>
            <ScrollLink
              to="gallery"
              {...scrollLinkProps}
              className="px-3 py-2 text-gray-700 hover:text-jeju-blue hover:bg-gray-50 font-medium rounded-md cursor-pointer"
              onClick={closeMenu}
            >
              갤러리
            </ScrollLink>
            <ScrollLink
              to="faq"
              {...scrollLinkProps}
              className="px-3 py-2 text-gray-700 hover:text-jeju-blue hover:bg-gray-50 font-medium rounded-md cursor-pointer"
              onClick={closeMenu}
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="contact"
              {...scrollLinkProps}
              className="px-3 py-2 bg-jeju-blue text-white font-medium rounded-md hover:bg-jeju-deep-blue transition-colors duration-300 cursor-pointer"
              onClick={closeMenu}
            >
              예약 문의
            </ScrollLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 
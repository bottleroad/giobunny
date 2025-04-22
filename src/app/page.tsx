import React from 'react';
import MainSlider from '@/components/MainSlider';
import Accommodation from '@/components/Accommodation';
import Usage from '@/components/Usage';
import RentalPolicy from '@/components/RentalPolicy';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <MainSlider />
      
      <section id="accommodation" className="section-container">
        <h2 className="section-title">숙소 소개</h2>
        <Accommodation />
      </section>
      
      <section id="usage" className="section-container bg-jeju-sand/20">
        <h2 className="section-title">이용 안내</h2>
        <Usage />
      </section>
      
      <section id="rental" className="section-container">
        <h2 className="section-title">임대 정책</h2>
        <RentalPolicy />
      </section>
      
      <section id="gallery" className="section-container bg-jeju-sand/20">
        <h2 className="section-title">갤러리</h2>
        <Gallery />
      </section>
      
      <section id="faq" className="section-container">
        <h2 className="section-title">자주 묻는 질문</h2>
        <FAQ />
      </section>
      
      <section id="contact" className="section-container bg-jeju-blue/10">
        <h2 className="section-title">예약 문의</h2>
        <Contact />
      </section>
    </>
  );
} 
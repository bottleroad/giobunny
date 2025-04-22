"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// FAQ 카테고리 및 질문 데이터
const faqData = [
  {
    category: '예약 및 결제',
    items: [
      {
        question: '최소 얼마나 머물러야 하나요?',
        answer: '한달살기는 최소 7일부터 예약 가능하며, 30일 이상 장기 체류 시 특별 할인이 적용됩니다.',
      },
      {
        question: '예약은 어떻게 진행되나요?',
        answer: '예약 문의 페이지를 통해 원하는 기간과 인원을 알려주시면 가능 여부를 확인 후 안내드립니다. 예약이 확정되면 계약금 입금 절차가 진행됩니다.',
      },
      {
        question: '결제는 어떻게 이루어지나요?',
        answer: '계약금은 총 금액의 30%를 먼저 입금하시고, 잔금은 체크인 7일 전까지 완납하시면 됩니다. 장기 체류의 경우 월 단위 분할 납부도 가능합니다.',
      },
    ],
  },
  {
    category: '숙소 시설',
    items: [
      {
        question: '와이파이가 제공되나요?',
        answer: '네, 초고속 와이파이가 무료로 제공됩니다. 디지털 노마드나 재택근무에 적합한 안정적인 인터넷 환경을 갖추고 있습니다.',
      },
      {
        question: '주방 시설은 어떻게 되어 있나요?',
        answer: '전자레인지, 냉장고, 전기밥솥, 인덕션, 각종 조리도구 및 식기류가 구비되어 있어 편리하게 취사가 가능합니다.',
      },
      {
        question: '세탁기를 사용할 수 있나요?',
        answer: '네, 세탁기와 건조기가 구비되어 있어 무료로 이용 가능합니다. 기본적인 세제도 제공됩니다.',
      },
    ],
  },
  {
    category: '위치 및 교통',
    items: [
      {
        question: '공항에서 숙소까지 어떻게 가나요?',
        answer: '제주국제공항에서 차로 약 30분 거리에 위치해 있습니다. 공항 리무진 버스나 택시를 이용하실 수 있지만, 렌트카를 이용하시는걸 추천드립니다.',
      },
      {
        question: '주변에 대중교통은 편리한가요?',
        answer: '숙소 앞 도보 5분 거리에 버스 정류장이 있어 제주시내 및 주요 관광지로 이동이 편리합니다. 하지만 제주도 특성상 배차시간이 길어서 렌트카를 이용하시면 더욱 자유롭게 이동하실 수 있습니다.',
      },
      {
        question: '주변에 어떤 편의시설이 있나요?',
        answer: '도보 10분 이내에 편의점, 카페, 식당 등이 있어 생활에 불편함이 없습니다. 도보 10분 거리에는 오름이 있어 산책하기 좋습니다.',
      },
    ],
  },
  {
    category: '기타',
    items: [
      {
        question: '반려동물을 동반할 수 있나요?',
        answer: '죄송합니다만, 알레르기가 있는 다른 고객님들을 위해 반려동물은 동반하실 수 없습니다. 단, 안내견은 예외입니다.',
      },
      {
        question: '흡연이 가능한가요?',
        answer: '실내는 금연입니다. 외부 흡연 구역을 이용해 주시기 바랍니다.',
      },
      {
        question: '주변 관광지등을 소개해 주세요.',
        answer: '차량으로 10분 거리에 뽀로로앤타요테마파크, 본테박물관, 방주교회, 카멜리아힐, 신화역사공원(놀이공원, 워터파크, 푸드스트리트), 오설록, 항공우주박물관, 우유부단카페, 이시돌목장, 서귀포자연휴양림, 헬로키티뮤지엄, 한국유일의 뽀얀 고온 온천이 나오는 아라고나이트 온천과 실내 수영장 등 볼거리와 놀거리가 풍부합니다. 집 바로 뒷 편의 한라산 아래 첫 마을 카페와 식당에는 전기자동차 충전소도 마련되어 있습니다.',
      },
    ],
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (itemIndex: number) => {
    if (openItems.includes(itemIndex)) {
      setOpenItems(openItems.filter(i => i !== itemIndex));
    } else {
      setOpenItems([...openItems, itemIndex]);
    }
  };

  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {faqData.map((category, categoryIndex) => (
          <button
            key={categoryIndex}
            className={`px-4 py-2 rounded-md transition-colors duration-300 font-medium ${
              activeCategory === categoryIndex
                ? 'bg-jeju-blue text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveCategory(categoryIndex)}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* 아코디언 */}
      <div className="space-y-4">
        {faqData[activeCategory].items.map((item, itemIndex) => {
          const isOpen = openItems.includes(itemIndex);
          return (
            <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleItem(itemIndex)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>
              {isOpen && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ; 
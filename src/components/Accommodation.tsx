import React from 'react';
import Image from 'next/image';
import { FaWifi, FaParking, FaUtensils, FaLeaf, FaMountain, FaUmbrellaBeach } from 'react-icons/fa';

const features = [
  {
    icon: <FaWifi className="text-3xl text-jeju-blue" />,
    title: '초고속 와이파이',
    description: '재택근무나 원격 학습에 필요한 안정적인 인터넷 환경을 제공합니다.',
  },
  {
    icon: <FaParking className="text-3xl text-jeju-blue" />,
    title: '무료 주차',
    description: '렌트카나 개인 차량을 위한 무료 주차 공간이 준비되어 있습니다.',
  },
  {
    icon: <FaUtensils className="text-3xl text-jeju-blue" />,
    title: '취사 시설',
    description: '조리에 필요한 모든 기구와 시설이 갖춰진 주방으로 장기 체류가 편리합니다.',
  },
  {
    icon: <FaLeaf className="text-3xl text-jeju-blue" />,
    title: '친환경 공간',
    description: '자연 친화적인 인테리어와 에코 프렌들리 어메니티를 제공합니다.',
  },
  {
    icon: <FaMountain className="text-3xl text-jeju-blue" />,
    title: '오름 조망',
    description: '창문 너머로 아름다운 제주의 오름을 감상할 수 있습니다.',
  },
  {
    icon: <FaUmbrellaBeach className="text-3xl text-jeju-blue" />,
    title: 'BBQ 시설',
    description: 'BBQ 시설을 갖추고 있어 친구들과 함께 즐거운 시간을 보낼 수 있습니다.',
  },
];

const Accommodation = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="section-subtitle">제주 한달살기 숙소</h3>
          <p className="mb-4 text-gray-700">
            서귀포시 한라산 아래 첫 마을에 위치한 저희 숙소는 한달 이상 장기 체류를 위한 최적의 공간입니다. 
            넓고 쾌적한 객실과 편리한 부대시설, 그리고 아름다운 주변 환경이 여러분의 제주 
            한달살기를 더욱 특별하게 만들어 드립니다.
          </p>
          <p className="mb-4 text-gray-700">
            디지털 노마드와 워케이션을 위한 업무 공간, 장기 투숙객을 위한 세탁 시설, 
            그리고 제주의 자연을 만끽할 수 있는 테라스까지 갖추고 있습니다. 제주에서의 
            일상이 편안하고 즐거울 수 있도록 모든 것을 준비했습니다.
          </p>
          <p className="text-gray-700">
            소중한 사람들과 함께, 또는 혼자만의 시간을 위해 제주 한달살기와 함께하세요.
          </p>
        </div>
        <div className="relative h-80 md:h-auto bg-jeju-sand/30 rounded-lg overflow-hidden">
          <Image 
            src="/images/giobunny.jpg" 
            alt="숙소 이미지" 
            fill 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h3 className="section-subtitle">주요 시설 및 특징</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">{feature.icon}</div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation; 
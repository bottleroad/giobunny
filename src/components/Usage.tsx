import React from 'react';
import { FaRegClock, FaRegCalendarCheck, FaRegStar, FaMapMarkedAlt } from 'react-icons/fa';

const usageInfo = [
  {
    icon: <FaRegClock className="text-3xl text-jeju-blue" />,
    title: '체크인/체크아웃',
    content: (
      <div>
        <p>체크인: 오후 3:00 이후</p>
        <p>체크아웃: 오전 11:00 이전</p>
        <p className="text-gray-600 mt-2 text-sm">
          사전 협의 시 얼리 체크인과 레이트 체크아웃 가능합니다. 
        </p>
      </div>
    ),
  },
  {
    icon: <FaRegCalendarCheck className="text-3xl text-jeju-blue" />,
    title: '이용 규칙',
    content: (
      <div>
        <ul className="list-disc pl-4 space-y-1">
          <li>실내 금연 (외부 흡연 구역 이용)</li>
          <li>밤 10시 이후 소음 주의</li>
          <li>반려동물 동반 불가 (안내견 제외)</li>          
        </ul>
      </div>
    ),
  },
  {
    icon: <FaRegStar className="text-3xl text-jeju-blue" />,
    title: '편의시설 이용',
    content: (
      <div>
        <ul className="list-disc pl-4 space-y-1">
          <li>세탁실 : 세탁기, 미니건조기 </li>
          <li>주방 : 24시간 이용 가능</li>
          <li>벽난로 : 동계 이용 가능</li>
        </ul>
      </div>
    ),
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-jeju-blue" />,
    title: '주변 정보',
    content: (
      <div>
        <ul className="list-disc pl-4 space-y-1">          
          <li>편의점: 도보 10분 거리</li>
          <li>버스 정류장: 도보 7분 거리</li>
          <li>카페: 도보 10분 거리</li>
          <li>오름: 도보 10분 거리</li>
          <li>한라산 아래 첫 마을 카페와 식당에는 전기자동차 충전소도 마련되어 있습니다.</li>
        </ul>
      </div>
    ),
  },
];

const Usage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {usageInfo.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="mr-4">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <div>{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Usage; 
import React from 'react';
import { FaRegCalendarAlt, FaRegMoneyBillAlt, FaRedoAlt } from 'react-icons/fa';

// 임대 정책 및 요금 정보
const monthlyRates = [
  { period: '비수기 (11월-2월)', rate: '1,300,000원' },
  { period: '준성수기 (3월-5월, 9월-10월)', rate: '1,500,000원' },
  { period: '성수기 (6월-8월)', rate: '1,800,000원' },
];

const weeklyRates = [
  { period: '비수기 (11월-2월)', rate: '450,000원' },
  { period: '준성수기 (3월-5월, 9월-10월)', rate: '550,000원' },
  { period: '성수기 (6월-8월)', rate: '650,000원' },
];

const RentalPolicy = () => {
  return (
    <div className="space-y-12">
      {/* 요금 정보 */}
      <div>
        <div className="flex items-center mb-4">
          <FaRegMoneyBillAlt className="text-2xl text-jeju-blue mr-3" />
          <h3 className="section-subtitle mb-0">요금 안내</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 월 단위 요금 */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">월 단위 요금</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월 요금</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyRates.map((rate, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 주 단위 요금 */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">주 단위 요금</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주 요금</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {weeklyRates.map((rate, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-jeju-sand/20 rounded-lg text-sm text-gray-600">
          <p>※ 요금에는 공과금(전기, 수도, 가스, 인터넷), 주 1회 청소 서비스, 기본 생필품이 포함되어 있습니다.</p>
          <p>※ 장기 체류 시 추가 할인이 적용됩니다. (3개월 이상: 10% 할인)</p>
        </div>
      </div>
      
      {/* 예약 정책 */}
      <div>
        <div className="flex items-center mb-4">
          <FaRegCalendarAlt className="text-2xl text-jeju-blue mr-3" />
          <h3 className="section-subtitle mb-0">예약 정책</h3>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">예약 확정</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>예약 확정은 계약금(총 금액의 30%) 입금 완료 시 이루어집니다.</li>
              <li>잔금은 체크인 7일 전까지 완납해주셔야 합니다.</li>
              <li>장기 체류의 경우 월 단위 분할 납부가 가능합니다.(별도 문의)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">보증금</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>체크인 시 보증금 200,000원이 별도로 발생합니다.</li>
              <li>퇴실 점검 후 시설물 파손이 없을 경우 전액 환불됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 취소 및 환불 정책 */}
      <div>
        <div className="flex items-center mb-4">
          <FaRedoAlt className="text-2xl text-jeju-blue mr-3" />
          <h3 className="section-subtitle mb-0">취소 및 환불 정책</h3>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">취소 시점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">환불 금액</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">체크인 30일 이전</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">전액 환불</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">체크인 14~29일 이전</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">총 금액의 80% 환불</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">체크인 7~13일 이전</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">총 금액의 50% 환불</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">체크인 3~6일 이전</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">총 금액의 30% 환불</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">체크인 2일 이내</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-jeju-sand/20 rounded-lg text-sm text-gray-600">
          <p>※ 천재지변이나 불가항력적인 사유로 인한 취소의 경우 별도 협의 가능합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default RentalPolicy;
'use client'
import { useEffect, useState } from 'react';

export default function Table({ telemetry = [] }) {
  const [data, setData] = useState(telemetry);

  useEffect(() => {
    // 1초마다 실행
    const interval = setInterval(() => {
      // 예: 새로운 패킷을 가져오는 함수
      fetchTelemetry();
    }, 1000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, []);

  const fetchTelemetry = () => {
    // 실제 구현 예시:
    // XBee, 시리얼, 파일 등에서 데이터를 가져오는 부분
    // 여기서는 단순히 데이터 추가하는 시뮬레이션
    setData(prev => [...prev, `Packet at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="w-full h-full border border-gray-300 bg-white rounded shadow flex flex-col">
      <div className="p-2 border-b bg-gray-100 font-semibold text-gray-700">
        Telemetry Data
      </div>
      <div className="flex-1 overflow-auto p-2 bg-gray-50">
        {data.length > 0 ? (
          data.map((line, idx) => (
            <div key={idx} className="font-mono text-sm">{line}</div>
          ))
        ) : (
          <p className="text-gray-400 italic">No telemetry data available.</p>
        )}
      </div>
    </div>
  );
}

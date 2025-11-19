// Table.jsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function Table({ telemetry = [] }) {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setData(telemetry);
  }, [telemetry]);

  // 최신 데이터 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded shadow">
      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 bg-gray-50 font-mono text-sm"
        style={{ minHeight: 0 }}
      >
        {data.length > 0 ? (
          data.map((line, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b border-gray-200 py-1"
            >
              <span className="text-gray-500 w-12 text-right">{idx + 1}:</span>
              <span className="text-gray-800 pl-2">{line}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No telemetry data available.</p>
        )}
      </div>
    </div>
  );
}
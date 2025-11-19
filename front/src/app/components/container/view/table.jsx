'use client';
import { useEffect, useRef, useState } from 'react';

const HEADERS = [
  "TEAM_ID", "TIME", "PACKET", "MODE", "STATE",
  "ALT", "TEMP", "PRESS", "VOLT", "G_R", "G_P", "G_Y",
  "A_R", "A_P", "A_Y", "MAG_R", "GPS_T", "GPS_A",
  "LAT", "LON", "SAT", "CMD"
];

export default function Table({ telemetry = [] }) {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);
  
  // ✅ 스크롤이 바닥에 붙어있는지 감지하는 Ref (기본값 true: 처음엔 바닥)
  const isAtBottomRef = useRef(true);

  useEffect(() => {
    setData(telemetry);
  }, [telemetry]);

  // ✅ 1. 스마트 스크롤 로직 (데이터 추가 시 동작)
  useEffect(() => {
    if (scrollRef.current) {
      // 사용자가 바닥에 주차해놓은 상태라면 -> 최신 데이터 따라가기 (자동 스크롤)
      if (isAtBottomRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      // 사용자가 스크롤을 올려서 보고 있다면 -> 가만히 있기 (동작 안 함)
    }
  }, [data]);

  // ✅ 2. 사용자의 스크롤 행위를 감지하는 핸들러
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // 바닥 감지 (오차범위 10px 정도 줌)
      // 스크롤이 맨 아래에 있으면 isAtBottomRef를 true로 설정
      const isBottom = scrollHeight - scrollTop - clientHeight < 20;
      isAtBottomRef.current = isBottom;
    }
  };

  // 데이터 파싱 함수 (이전과 동일)
  const processRow = (line) => {
    const parts = line.split(',');
    if (parts.length === 4 && parts[0] === 'CMD') {
      const row = new Array(HEADERS.length).fill("0.00");
      row[0] = parts[1].trim();
      row[3] = "Simulation";
      row[7] = parts[3].trim();
      row[2] = "0"; row[4] = "Ready"; row[20] = "0";
      return row;
    }
    if (parts.length >= HEADERS.length) return parts.map(p => p.trim());
    return parts.map(p => p.trim());
  };

  return (
    <div className="flex flex-col h-full w-full border border-gray-300 rounded shadow bg-white overflow-hidden">
      
      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll} // 스크롤 이벤트 연결
        className="flex-1 overflow-auto bg-white relative" 
      >
        <table className="min-w-max w-full text-xs font-mono border-collapse table-auto">
          
          {/* ✅ 헤더 고정 및 겹침 방지 (Z-Index 계층 구조)
             - Top Left Corner (No.): z-50 (가장 위)
             - Top Header Rows: z-40 (그 다음 위)
             - Left Column (Rows): z-30 (데이터보단 위, 헤더보단 아래)
             - Data Cells: z-auto (가장 아래)
          */}
          <thead className="sticky top-0 z-40 shadow-md">
            <tr className="bg-gray-200">
              {/* 왼쪽 상단 'No.' 헤더: 가로/세로 스크롤 모두 고정되어야 하므로 z-50 */}
              <th className="border border-gray-400 px-2 py-1 text-center bg-gray-200 w-10 sticky left-0 top-0 z-50 shadow-[1px_1px_0_0_rgba(156,163,175,1)]">
                No.
              </th>
              {HEADERS.map((header, index) => (
                <th 
                  key={index} 
                  className="border border-gray-400 px-2 py-1 text-center font-bold text-gray-700 whitespace-nowrap bg-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((line, rowIdx) => {
                const cells = processRow(line);
                while (cells.length < HEADERS.length) cells.push("0");

                return (
                  <tr key={rowIdx} className="hover:bg-blue-50 odd:bg-white even:bg-gray-50">
                    {/* 왼쪽 '순번' 열: 가로 스크롤 시 고정 (z-30) */}
                    <td className="border border-gray-400 px-2 py-1 text-center text-gray-500 bg-gray-100 sticky left-0 z-30 font-semibold shadow-[1px_0_0_0_rgba(156,163,175,1)]">
                      {rowIdx + 1}
                    </td>
                    {/* 일반 데이터 셀 */}
                    {cells.map((cell, colIdx) => (
                      <td 
                        key={colIdx} 
                        className={`border border-gray-400 px-2 py-1 text-center whitespace-nowrap z-0 ${colIdx === 7 || colIdx === 3 ? 'text-blue-600 font-bold' : 'text-gray-800'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={HEADERS.length + 1} className="p-4 text-center text-gray-400 italic">
                  No telemetry data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
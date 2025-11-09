'use client';
import { useState } from "react";
import Chart from "../sidebar/view/chart";
import Echo from "../sidebar/view/echo";
import Table from "../sidebar/view/table";

export default function Container({ view, telemetry }) {
  const [commands, setCommands] = useState([]);
  const [cmd, setCmd] = useState('');

  const handleInputChange = (e) => setCmd(e.target.value);
  const handleUpload = () => {
    if (cmd.trim() !== '') {
      setCommands((prev) => [...prev, cmd]);
      setCmd('');
    }
  };
  const clear = () => setCommands([]);

  return (
    <main className=" flex flex-col flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-l border-gray-300 shadow-md p-4 h-full">
      {/* 상단 뷰 영역 (입력창 제외하고 전체 차지) */}
      <div className="flex-1 overflow-hidden mb-[10px]">
        {/* 제목 + 버튼들 한 줄로 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold capitalize text-gray-800">{view} View</h2>

          {/* 버튼 그룹 */}
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition">
              SET TIME
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition">
              CALIBRATE
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition">
              MEC ON
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md shadow-sm transition">
              START TELEMETRY
            </button>
            <button className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded-md shadow-sm transition">
              STOP TELEMETRY
            </button>
          </div>
        </div>

        {/* 메인 뷰 영역 */}
        <div className="w-full h-full bg-white rounded-md shadow-inner overflow-auto">
          {view === 'table' && <Table telemetry={telemetry} />}
          {view === 'chart' && <Chart />}
          {view === 'echo' && <Echo />}
        </div>

        {/* 명령 출력 영역 */}
        <div className="mt-4 space-y-1 overflow-y-auto max-h-60">
          {commands.map((command, idx) => (
            <p key={idx} className="text-gray-700">{command}</p>
          ))}
        </div>
      </div>

      {/* 하단 입력 영역 (항상 맨 아래 고정, 10px 여백 포함) */}
      <div className="border-t border-gray-300 bg-gray-100 p-3 rounded-md shadow-inner">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={cmd}
            onChange={handleInputChange}
            placeholder="command..."
            className="flex-1 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={handleUpload}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
          <button
            onClick={clear}
            className="px-5 py-2 bg-gray-400 text-white font-medium rounded-md shadow hover:bg-gray-500 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}

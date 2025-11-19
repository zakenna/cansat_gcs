'use client';
<<<<<<< HEAD
import { useState } from "react";

// ✅ 뷰 컴포넌트 경로 수정 (현재 파일 위치 기준)
// Container는 src/app/components/container 에 있고, 
// View들은 src/app/components/sidebar/view 에 있다고 가정합니다.
import Chart from "./view/chart";
import Echo from "./view/echo";
import Table from "./view/table";
import useCommands from "../../hooks/useCommands";
import CommandButton from "../../ui/CommandButton";

// ✅ 절대 경로(@)를 사용하여 Hooks 불러오기

export default function Container({ view, telemetry }) {
  // ✅ 1. Hooks 사용: 팀 ID "1062"를 전달하여 초기화
  // 이제 모든 시간 계산과 명령어 로직은 이 한 줄로 처리됩니다.
  const { command, actions } = useCommands("1062");
  
  // ✅ 2. UI 상태 관리: 수동 입력창의 텍스트만 여기서 관리
  const [inputText, setInputText] = useState('');

  // 수동 명령어 전송 핸들러
  const handleManualSend = () => {
    actions.sendManual(inputText);
    setInputText(''); // 전송 후 입력창 비우기
  };

  return (
    <main className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-l border-gray-300 shadow-md p-4 rounded-l-2xl">

      {/* 상단 뷰 영역 */}
      <div className="flex flex-col flex-1 overflow-hidden mb-[10px]">

        {/* 제목 + 버튼들 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold capitalize text-gray-800">{view} View</h2>

          {/* ✅ 3. 버튼 연결: actions 객체의 함수들을 바로 할당 */}
          <div className="flex space-x-2">
            <CommandButton onClick={actions.setTime} color="gray">
              SET TIME
            </CommandButton>
            
            <CommandButton onClick={actions.calibrate} color="gray">
              CALIBRATE
            </CommandButton>
            
            <CommandButton onClick={actions.mecOn} color="gray">
              MEC ON
            </CommandButton>
            
            <CommandButton onClick={actions.startTelemetry} color="blue">
              START TELEMETRY
            </CommandButton>
            
            <CommandButton onClick={actions.stopTelemetry} color="red">
              STOP TELEMETRY
            </CommandButton>
=======
import { useEffect, useState } from "react";
import Chart from "../sidebar/view/chart";
import Echo from "../sidebar/view/echo";
import Table from "../sidebar/view/table";

export default function Container({ view, telemetry }) {
  const [commands, setCommands] = useState([]);
  const [cmd, setCmd] = useState('');
  const [time, setTime] = useState("");
  const [currentTime, setCurrentTime] = useState('');

  const handleInputChange = (e) => setCmd(e.target.value);
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');

      // HH:MM:SS UTC 형식으로 설정
      setCurrentTime(`(${hours}:${minutes}:${seconds}) >>> `); 
    };

    updateTime(); 
    const intervalId = setInterval(updateTime, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); 
  }, []);

  const handleUpload = () => {
    if (cmd.trim() !== '') {
      setCommands((prev) => [...prev, currentTime + cmd]);
      setCmd('');
    }
  };
  const clear = () => setCommands([]);

  return (
    // 🌟 수정 1: h-full 제거, rounded-l-2xl을 추가하여 왼쪽 모서리를 둥글게 처리하고, 하단 여백을 없애기 위해 mb-[10px]를 제거했습니다.
    <main className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-l border-gray-300 shadow-md p-4 rounded-l-2xl">

      {/* 상단 뷰 영역 (입력창 제외하고 전체 차지) */}
      {/* 🌟 수정 2: flex flex-col을 추가하여 내부 요소가 수직으로 공간을 분배하도록 했습니다. (스크롤 문제 해결) */}
      <div className="flex flex-col flex-1 overflow-hidden mb-[10px]">

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
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
          </div>
        </div>

        {/* 메인 뷰 영역 */}
<<<<<<< HEAD
        <div className="w-full flex-1 bg-white rounded-md shadow-inner overflow-auto">
          {view === 'table' && <Table telemetry={telemetry} />}
          {view === 'chart' && <Chart />}
          {/* 훅에서 관리되는 로그 데이터를 Echo 뷰로 전달 */}
          {view === 'echo' && <Echo commands={command} />}
        </div>
      </div>

      {/* 하단 입력 영역 */}
=======
        {/* 🌟 수정 3: h-full 대신 flex-1 적용하여 남은 공간을 채우도록 했습니다. (스크롤 문제 해결) */}
        <div className="w-full flex-1 bg-white rounded-md shadow-inner overflow-auto">
          {view === 'table' && <Table telemetry={telemetry} />}
          {view === 'chart' && <Chart />}
          {view === 'echo' && <Echo commands={commands} />}
        </div>
      </div>

      {/* 하단 입력 영역 (항상 맨 아래 고정, 10px 여백 포함) */}
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
      <div className="border-t border-gray-300 bg-gray-100 p-3 rounded-md shadow-inner">
        <div className="flex items-center space-x-3">
          <input
            type="text"
<<<<<<< HEAD
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualSend()}
            placeholder="Command..."
            className="flex-1 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={handleManualSend}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-colors active:scale-95"
=======
            value={cmd}
            onChange={handleInputChange}
            placeholder="command..."
            className="flex-1 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={handleUpload}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
          >
            Send
          </button>
          <button
<<<<<<< HEAD
            onClick={actions.clearLogs}
            className="px-5 py-2 bg-gray-400 text-white font-medium rounded-md shadow hover:bg-gray-500 transition-colors active:scale-95"
=======
            onClick={clear}
            className="px-5 py-2 bg-gray-400 text-white font-medium rounded-md shadow hover:bg-gray-500 transition-colors"
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
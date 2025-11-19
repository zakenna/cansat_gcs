'use client';
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
          </div>
        </div>

        {/* 메인 뷰 영역 */}
        <div className="w-full flex-1 bg-white rounded-md shadow-inner overflow-auto">
          {view === 'table' && <Table telemetry={telemetry} />}
          {view === 'chart' && <Chart />}
          {/* 훅에서 관리되는 로그 데이터를 Echo 뷰로 전달 */}
          {view === 'echo' && <Echo commands={command} />}
        </div>
      </div>

      {/* 하단 입력 영역 */}
      <div className="border-t border-gray-300 bg-gray-100 p-3 rounded-md shadow-inner">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualSend()}
            placeholder="Command..."
            className="flex-1 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={handleManualSend}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-colors active:scale-95"
          >
            Send
          </button>
          <button
            onClick={actions.clearLogs}
            className="px-5 py-2 bg-gray-400 text-white font-medium rounded-md shadow hover:bg-gray-500 transition-colors active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
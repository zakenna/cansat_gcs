'use client';
import { useState } from 'react';

export default function Sidebar({ setView, setTelemetry, setConnected }) {
  const [loading, setLoading] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
  const [mode, setMode] = useState('enable'); // enable | simulation-ready | simulation-start
  const [state, setState] = useState('Live Mode'); // 상태 표시용

  // ✅ 실시간 데이터 수신(기본)
  const startLiveConnection = () => {
    setConnected(true);
    setState('Live Mode');
    setMode('enable');
    console.log('📡 실시간 데이터 수신 중...');
  };

  // ✅ 시뮬레이션 모드 전환
  const enableSimulationMode = async () => {
    try {
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error();

      // 파일 존재함 → 준비 완료
      setMode('simulation-ready');
      setState('Simulation mode ready');
      setConnected(false);
      alert('✅ 시뮬레이션 모드로 전환되었습니다.');

    } catch (err) {
      alert('❌ 시뮬레이션 파일을 찾을 수 없습니다.');
    }
  };

  // ✅ 시뮬레이션 시작
  const startSimulation = async () => {
    if (mode !== 'simulation-ready') {
      alert('⚠ 먼저 Disable을 눌러 시뮬레이션 모드로 전환하세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error('파일을 불러오지 못했습니다.');

      const text = await res.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');

      setTelemetry([]);
      setPacketCount(0);
      setMode('simulation-start');
      setState('Simulation start');

      // 1초마다 한 줄씩 테이블에 반영
      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setTelemetry(prev => [...prev, lines[i]]);
        setPacketCount(prev => prev + 1);
      }

      setState('Simulation completed');
      setMode('enable'); // 끝나면 다시 enable로 전환

    } catch (err) {
      console.error('Simulation error:', err);
      alert('⚠ 시뮬레이션 실행 중 오류가 발생했습니다.');
      setMode('enable');
      setState('Live Mode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-72 h-full bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-r border-gray-300 shadow-md p-4 flex flex-col justify-between rounded-r-2xl text-sm">

      {/* ✅ Control Panel */}
      <section className="space-y-3">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
          Control Panel
        </h2>

        <div className="flex flex-col gap-1.5">

          <div className="grid grid-cols-2 gap-1.5">
            {/* Enable → 기본 실시간 모드 */}
            <button
              onClick={startLiveConnection}
              className={`py-1 rounded-md text-sm border transition-all duration-200 ${
                mode === 'enable'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-green-500 hover:text-white border-gray-300'
              }`}
            >
              Enable
            </button>

            {/* Disable → 시뮬레이션 모드 준비 */}
            <button
              onClick={enableSimulationMode}
              className={`py-1 rounded-md text-sm border transition-all duration-200 ${
                mode === 'simulation-ready'
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-800 hover:bg-yellow-400 hover:text-white border-gray-300'
              }`}
            >
              Disable
            </button>

            {/* Activate → 시뮬레이션 시작 */}
            <button
              onClick={startSimulation}
              disabled={loading}
              className={`col-span-2 py-1 rounded-md text-sm border transition-all duration-200 ${
                mode === 'simulation-start'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-indigo-500 hover:text-white border-gray-300'
              }`}
            >
              Activate
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Status Monitor */}
      <section className="mt-4 space-y-1">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
          Status Monitor
        </h2>
        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-[13px]">
          <p className="text-gray-700 mt-0.5">
            <span className="font-semibold">State:</span>{' '}
            <span className={`font-semibold ${
              state.includes('Simulation')
                ? 'text-indigo-600'
                : state === 'Live Mode'
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {state}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Packet:</span>{' '}
            <span className="text-blue-600">{packetCount}</span>
          </p>
        </div>
      </section>

      {/* ✅ Telemetry View */}
      <section className="mt-4 space-y-2">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
          Telemetry View
        </h2>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setView('chart')}
            className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors"
          >
            Chart View
          </button>
          <button
            onClick={() => setView('table')}
            className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors"
          >
            Table View
          </button>
          <button
            onClick={() => setView('echo')}
            className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors"
          >
            Cmd View
          </button>
        </div>
      </section>
    </aside>
  );
}

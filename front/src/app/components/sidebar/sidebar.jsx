'use client';
import { useState } from 'react';

export default function Sidebar({ setView, setTelemetry, setConnected }) {
  const [loading, setLoading] = useState(false);
  const [packetCount, setPacketCount] = useState(0);

  const startConnection = async () => {
    setLoading(true);
    try {
      setConnected(false);
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error('파일을 불러오지 못했습니다.');
      const text = await res.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      setTelemetry(lines);
      setPacketCount(lines.length);
      setConnected(true);
    } catch (err) {
      console.error('Failed to load telemetry:', err);
      setConnected(false);
      setTelemetry([]);
      setPacketCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-72 h-full mb-[10px] bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-r border-gray-300 shadow-md p-4 flex flex-col justify-between rounded-r-2xl text-sm">
      
      {/* ✅ Control Panel */}
      <section className="space-y-3">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">Control Panel</h2>
        
        <div className="flex flex-col gap-1.5">
          <button
            onClick={startConnection}
            className={`py-1 rounded-md text-sm border shadow-sm transition-all duration-200 ${
              loading
                ? 'bg-gray-200 text-gray-600 cursor-wait'
                : 'bg-white hover:bg-blue-500 hover:text-white text-gray-800 border-gray-300'
            }`}
          >
            {loading ? 'Loading...' : '▶ Start'}
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            <button className="py-1 rounded-md text-sm bg-white border border-gray-300 hover:bg-green-500 hover:text-white transition-all duration-200">
              Enable
            </button>
            <button className="py-1 rounded-md text-sm bg-white border border-gray-300 hover:bg-yellow-400 hover:text-white transition-all duration-200">
              Disable
            </button>
            <button className="col-span-2 py-1 rounded-md text-sm bg-white border border-gray-300 hover:bg-indigo-500 hover:text-white transition-all duration-200">
              Activate
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Status Monitor */}
      <section className="mt-4 space-y-1">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">Status Monitor</h2>
        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-[13px]">
          <p className="text-gray-700">
            <span className="font-semibold">Packet:</span>{' '}
            <span className="text-blue-600">{packetCount}</span>
          </p>
          <p className="text-gray-700 mt-0.5">
            <span className="font-semibold">State:</span>{' '}
            <span className={`font-semibold ${packetCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {packetCount > 0 ? 'Simulation' : 'Disconnected'}
            </span>
          </p>
        </div>
      </section>

      {/* ✅ Telemetry View */}
      <section className="mt-4 space-y-2">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">Telemetry View</h2>
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

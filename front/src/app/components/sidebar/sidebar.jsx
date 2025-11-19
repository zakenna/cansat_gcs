'use client';

import { useState, useEffect } from 'react';
// Leaflet 관련
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet 아이콘 깨짐 방지
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 지도 중심 자동 이동
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function Sidebar({ setView, setTelemetry, setConnected }) {
  const [loading, setLoading] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
  const [mode, setMode] = useState('enable');
  const [state, setState] = useState('Live Mode');

  // 기본 GPS 좌표 (울산 예시)
  const [gps, setGps] = useState({ lat: 35.5438, lng: 129.4276 });

  // 실시간 수신 모드
  const startLiveConnection = () => {
    setConnected(true);
    setState('Live Mode');
    setMode('enable');
    console.log('📡 실시간 데이터 수신 중...');
  };

  // 시뮬레이션 모드 준비
  const enableSimulationMode = async () => {
    try {
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error();

      setMode('simulation-ready');
      setState('Simulation mode ready');
      setConnected(false);
      alert('✅ 시뮬레이션 모드로 전환되었습니다.');
    } catch (err) {
      alert('❌ 시뮬레이션 파일을 찾을 수 없습니다.');
    }
  };

  // 시뮬레이션 시작
  const startSimulation = async () => {
    if (mode !== 'simulation-ready') {
      alert('⚠ 먼저 Disable을 눌러 시뮬레이션 모드로 전환하세요.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error();

      const text = await res.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');

      setTelemetry([]);
      setPacketCount(0);
      setMode('simulation-start');
      setState('Simulation start');

      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 위도경도 랜덤 예시 (원한다면 실제 데이터로 교체)
        const newLat = 35.5438 + (Math.random() * 0.01 - 0.005);
        const newLng = 129.4276 + (Math.random() * 0.01 - 0.005);
        setGps({ lat: newLat, lng: newLng });

        setTelemetry(prev => [...prev, lines[i]]);
        setPacketCount(prev => prev + 1);
      }

      setState('Simulation completed');
      setMode('enable');
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
    <aside className="w-72 h-full mb-[10px] bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-r border-gray-300 shadow-md p-4 flex flex-col justify-between rounded-r-2xl text-sm overflow-y-auto">

      <div className="space-y-4">

        {/* Control Panel */}
        <section className="space-y-3">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">Control Panel</h2>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={startLiveConnection}
              className={`py-1 rounded-md text-sm border transition-all 
                ${mode === 'enable'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-green-500 hover:text-white border-gray-300'}`}>
              Enable
            </button>

            <button
              onClick={enableSimulationMode}
              className={`py-1 rounded-md text-sm border transition-all 
                ${mode === 'simulation-ready'
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-800 hover:bg-yellow-400 hover:text-white border-gray-300'}`}>
              Disable
            </button>

            <button
              onClick={startSimulation}
              disabled={loading}
              className={`col-span-2 py-1 rounded-md text-sm border transition-all
                ${mode === 'simulation-start'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-indigo-500 hover:text-white border-gray-300'}`}>
              Activate
            </button>
          </div>
        </section>

        {/* Status Monitor */}
        <section className="space-y-1">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">Status Monitor</h2>

          <div className="bg-white p-2 rounded-md shadow-sm border text-[13px]">
            <p className="text-gray-700">
              <span className="font-semibold">State:</span>{' '}
              <span className={`font-semibold ${
                state.includes('Simulation') ? 'text-indigo-600'
                : state === 'Live Mode' ? 'text-green-600'
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

        {/* GPS Map View */}
        <section className="space-y-1">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">GPS Tracking</h2>

          <div className="w-full h-40 rounded-md overflow-hidden border shadow-sm z-0">
            <MapContainer 
              center={[gps.lat, gps.lng]} 
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}>
              
              <TileLayer 
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[gps.lat, gps.lng]}>
                <Popup>CanSat<br/>Lat: {gps.lat.toFixed(4)}<br/>Lng: {gps.lng.toFixed(4)}</Popup>
              </Marker>

              <ChangeView center={[gps.lat, gps.lng]} />
            </MapContainer>
          </div>

          <div className="text-[11px] text-gray-500 flex justify-between px-1">
            <span>Lat: {gps.lat.toFixed(6)}</span>
            <span>Lng: {gps.lng.toFixed(6)}</span>
          </div>
        </section>

      </div>

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

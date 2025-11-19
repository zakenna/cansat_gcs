'use client';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
// ✅ Leaflet 지도 관련 라이브러리 임포트
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // 스타일 필수
import L from 'leaflet';

// ✅ Leaflet 기본 마커 아이콘 깨짐 방지 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ✅ 지도의 중심을 GPS 좌표로 자동 이동시키는 컴포넌트
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}
=======
import { useState } from 'react';
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf

export default function Sidebar({ setView, setTelemetry, setConnected }) {
  const [loading, setLoading] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
<<<<<<< HEAD
  const [mode, setMode] = useState('enable');
  const [state, setState] = useState('Live Mode');
  
  // ✅ GPS 좌표 상태 (기본값: 울산과학대학교 혹은 서울 등 원하는 곳)
  const [gps, setGps] = useState({ lat: 35.5438, lng: 129.4276 }); // 예: 울산

  // ... (startLiveConnection, enableSimulationMode는 기존과 동일) ...
=======
  const [mode, setMode] = useState('enable'); // enable | simulation-ready | simulation-start
  const [state, setState] = useState('Live Mode'); // 상태 표시용

  // ✅ 실시간 데이터 수신(기본)
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
  const startLiveConnection = () => {
    setConnected(true);
    setState('Live Mode');
    setMode('enable');
    console.log('📡 실시간 데이터 수신 중...');
  };

<<<<<<< HEAD
=======
  // ✅ 시뮬레이션 모드 전환
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
  const enableSimulationMode = async () => {
    try {
      const res = await fetch('/data/telemetry.txt');
      if (!res.ok) throw new Error();
<<<<<<< HEAD
=======

      // 파일 존재함 → 준비 완료
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
      setMode('simulation-ready');
      setState('Simulation mode ready');
      setConnected(false);
      alert('✅ 시뮬레이션 모드로 전환되었습니다.');
<<<<<<< HEAD
=======

>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
    } catch (err) {
      alert('❌ 시뮬레이션 파일을 찾을 수 없습니다.');
    }
  };

<<<<<<< HEAD
  // ✅ 시뮬레이션 시작 (GPS 데이터 파싱 로직 추가됨)
=======
  // ✅ 시뮬레이션 시작
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
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

<<<<<<< HEAD
      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ✅ 데이터 파싱 예시 (실제 데이터 포맷에 맞춰 수정 필요)
        // 가령 데이터가 "TIME,LAT,LNG,..." 형식이라면:
        const parts = lines[i].split(','); 
        // 실제 데이터에 맞게 인덱스 수정하세요. 아래는 임시 난수입니다.
        const newLat = 35.5438 + (Math.random() * 0.01 - 0.005); 
        const newLng = 129.4276 + (Math.random() * 0.01 - 0.005);
        
        setGps({ lat: newLat, lng: newLng }); // 지도 좌표 업데이트
=======
      // 1초마다 한 줄씩 테이블에 반영
      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
        setTelemetry(prev => [...prev, lines[i]]);
        setPacketCount(prev => prev + 1);
      }

      setState('Simulation completed');
<<<<<<< HEAD
      setMode('enable');
=======
      setMode('enable'); // 끝나면 다시 enable로 전환
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf

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
<<<<<<< HEAD
    <aside className="w-72 h-full mb-[10px] bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-r border-gray-300 shadow-md p-4 flex flex-col justify-between rounded-r-2xl text-sm overflow-y-auto">

      {/* 상단 컨테이너 (Control + Status + Map) */}
      <div className="space-y-4">
        
        {/* ✅ Control Panel */}
        <section className="space-y-3">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
            Control Panel
          </h2>
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={startLiveConnection} className={`py-1 rounded-md text-sm border transition-all duration-200 ${mode === 'enable' ? 'bg-green-500 text-white' : 'bg-white text-gray-800 hover:bg-green-500 hover:text-white border-gray-300'}`}>Enable</button>
              <button onClick={enableSimulationMode} className={`py-1 rounded-md text-sm border transition-all duration-200 ${mode === 'simulation-ready' ? 'bg-yellow-400 text-white' : 'bg-white text-gray-800 hover:bg-yellow-400 hover:text-white border-gray-300'}`}>Disable</button>
              <button onClick={startSimulation} disabled={loading} className={`col-span-2 py-1 rounded-md text-sm border transition-all duration-200 ${mode === 'simulation-start' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800 hover:bg-indigo-500 hover:text-white border-gray-300'}`}>Activate</button>
            </div>
          </div>
        </section>

        {/* ✅ Status Monitor */}
        <section className="space-y-1">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
            Status Monitor
          </h2>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-[13px]">
            <p className="text-gray-700 mt-0.5">
              <span className="font-semibold">State:</span>{' '}
              <span className={`font-semibold ${state.includes('Simulation') ? 'text-indigo-600' : state === 'Live Mode' ? 'text-green-600' : 'text-red-600'}`}>{state}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Packet:</span>{' '}
              <span className="text-blue-600">{packetCount}</span>
            </p>
          </div>
        </section>

        {/* ✅ GPS Map View (여기에 추가됨) */}
        <section className="space-y-1">
          <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
            GPS Tracking
          </h2>
          <div className="w-full h-40 rounded-md overflow-hidden border border-gray-300 shadow-sm z-0">
            {/* z-0은 드롭다운 등 다른 UI와 겹침 방지 */}
            <MapContainer 
              center={[gps.lat, gps.lng]} 
              zoom={15} 
              scrollWheelZoom={true} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[gps.lat, gps.lng]}>
                <Popup>
                  CanSat Location <br /> Lat: {gps.lat.toFixed(4)}, Lng: {gps.lng.toFixed(4)}
                </Popup>
              </Marker>
              {/* 좌표 변경 시 지도 중심 이동 */}
              <ChangeView center={[gps.lat, gps.lng]} />
            </MapContainer>
          </div>
          <div className="text-[11px] text-gray-500 flex justify-between px-1">
            <span>Lat: {gps.lat.toFixed(6)}</span>
            <span>Lng: {gps.lng.toFixed(6)}</span>
          </div>
        </section>

      </div>

      {/* ✅ Telemetry View (하단 고정) */}
=======
    <aside className="w-72 h-full mb-[10px] bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 border-r border-gray-300 shadow-md p-4 flex flex-col justify-between rounded-r-2xl text-sm">

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
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
      <section className="mt-4 space-y-2">
        <h2 className="text-gray-800 font-semibold text-base border-b border-gray-300 pb-1">
          Telemetry View
        </h2>
        <div className="flex flex-col space-y-1">
<<<<<<< HEAD
          <button onClick={() => setView('chart')} className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors">Chart View</button>
          <button onClick={() => setView('table')} className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors">Table View</button>
          <button onClick={() => setView('echo')} className="py-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-md hover:bg-blue-100 transition-colors">Cmd View</button>
=======
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
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf
        </div>
      </section>
    </aside>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 78537e58daccafec07ad5ae652a9a5412b7e41bf

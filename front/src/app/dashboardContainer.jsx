// front/src/app/dashboardContainer.jsx
'use client';
import { useState, useEffect } from 'react'; // 👈 useEffect import 추가
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from './components/header/header';

export default function DashboardContainer() {
  const [view, setView] = useState('table');
  const [telemetry, setTelemetry] = useState([]);
  const [connected, setConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState(''); // 👈 현재 시각 상태 추가

  // UTC 현재 시각을 실시간으로 업데이트하는 로직 (HH:MM:SS UTC 형식)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');

      // HH:MM:SS UTC 형식으로 설정
      setCurrentTime(`${hours}:${minutes}:${seconds} UTC`); 
    };

    updateTime(); 
    const intervalId = setInterval(updateTime, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); 
  }, []);
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* ✅ 상단 Header */}
      {/* 👈 currentTime prop 전달 */}
      <Header connected={connected} currentTime={currentTime} /> 

      {/* ✅ Sidebar + Container */}
      <div className="flex flex-1 w-full h-[calc(100vh-10rem)]"> {/* Header 높이 반영 */}
        <Sidebar
          setView={setView}
          setTelemetry={setTelemetry}
          setConnected={setConnected}
        />
        <Container
          view={view}
          telemetry={telemetry}
        />
      </div>
    </div>
  );
}
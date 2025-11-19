'use client';
import { useState, useEffect } from 'react';
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from './components/header/header';
import useCommands from './hooks/useCommands'; // ⭐ 훅 import

export default function DashboardContainer() {
  const [view, setView] = useState('table');
  const [telemetry, setTelemetry] = useState([]);
  const [connected, setConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // ✅ UTC 현재 시각 실시간 업데이트
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // ✅ useCommands 훅 호출
  const { commandLogs, actions } = useCommands("1062"); // teamId 전달 가능

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header connected={connected} currentTime={currentTime} />

      <div className="flex flex-1 w-full h-[calc(100vh-10rem)]">
        <Sidebar
          setView={setView}
          setTelemetry={setTelemetry}
          setConnected={setConnected}
        />

        {/* ✅ actions와 commandLogs 전달 */}
        <Container
          view={view}
          telemetry={telemetry}
          actions={actions}
          commandLogs={commandLogs}
        />
      </div>
    </div>
  );
}

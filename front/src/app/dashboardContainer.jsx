'use client';
import { useState } from 'react';
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from './components/header/header';

export default function DashboardContainer() {
  const [view, setView] = useState('table');
  const [telemetry, setTelemetry] = useState([]);
  const [connected, setConnected] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* ✅ 상단 Header */}
      <Header connected={connected} />

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

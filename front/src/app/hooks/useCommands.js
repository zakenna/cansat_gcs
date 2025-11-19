'use client';
import { useState, useEffect, useCallback } from 'react';

export default function useCommands(teamId = "1062") {
  const [commandLogs, setCommandLogs] = useState([]);
  const [currentTimePrefix, setCurrentTimePrefix] = useState('');
  
  // ✅ 시간 업데이트 로직 (훅 내부로 이동)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTimePrefix(`(${h}:${m}:${s})`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ 로그 추가 함수 (내부용)
  const addLog = useCallback((msg) => {
    setCommandLogs(prev => [...prev, `${currentTimePrefix} >>> ${msg}`]);
    console.log(`[TX] ${msg}`);
  }, [currentTimePrefix]);

  // ==========================================
  // 🎮 실제 명령어 동작 함수들 (Actions)
  // ==========================================

  const actions = {
    // 1. 수동 입력 전송
    sendManual: (cmd) => {
      if (cmd && cmd.trim()) addLog(cmd);
    },

    // 2. 시간 동기화
    setTime: () => {
      const timeBody = currentTimePrefix.replace(/[()]/g, '');
      addLog(`CMD,${teamId},ST,${timeBody}`);
    },

    // 3. 센서 보정
    calibrate: () => {
      if (window.confirm("센서 보정을 진행하시겠습니까?")) {
        addLog(`CMD,${teamId},SIM,ENABLE`);
      }
    },

    // 4. 기구부 작동
    mecOn: () => {
      if (window.confirm("⚠ 기구 장치(MEC)를 작동시킵니다!")) {
        addLog(`CMD,${teamId},MEC,ON`);
      }
    },

    // 5. 텔레메트리 시작
    startTelemetry: () => {
      addLog(`CMD,${teamId},CX,ON`);
    },

    // 6. 텔레메트리 중지
    stopTelemetry: () => {
      addLog(`CMD,${teamId},CX,OFF`);
    },

    // 7. 로그 초기화
    clearLogs: () => setCommandLogs([])
  };

  // UI에서 필요한 데이터(로그)와 함수들(actions)을 반환
  return { commandLogs, actions };
}
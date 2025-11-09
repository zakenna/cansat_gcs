// front/src/app/components/header/header.jsx
'use client';

// connected prop과 currentTime prop을 받도록 수정
export default function Header({ connected, currentTime }) { 
  return (
    <header className="w-full h-24 gap-[10px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg text-gray-100 flex items-center justify-between px-10 border-b border-gray-700 relative">
      {/* 왼쪽 로고 + 텍스트 */}
      <div className="flex items-center gap-5">
        <img
          src="./logo/KakaoTalk_20251022_214746274.png"
          alt="LOGO"
          className="w-16 h-16 object-contain drop-shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide">GCS</h2>
          <p className="text-sm text-gray-400 font-medium">Team ID: 2167</p>
        </div>
      </div>

      {/* 중앙 제목 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-200">
          Team CosmoLink
        </h1>
      </div>
      
      {/* 👈 오른쪽 UTC 현재 시각 표시 영역 추가 */}
      <div className="flex items-center">
        <span className="text-2xl font-mono font-bold text-green-400">
          {currentTime}
        </span>
      </div>
    </header>
  );
}
import React, { useState } from 'react'

export default function Echo({ commands }) {
  
  {/* 캔샛 필수 커맨드 모음 객체 */}
  const echoCommands = {
    
  }

  return (
    <div>
      {commands.map((command, idx) => (
        <p key={idx} className="text-gray-700">{command}</p>
      ))}
    </div>
  )
}

// components/viewMode/chart.jsx
'use client'
import React from 'react'

export default function Chart() {
  return (
    <div className="p-4 border border-gray-300 bg-white rounded shadow">
      <p className="text-lg font-medium">This is the **Chart** mode content!</p>
      <div className="h-64 mt-4 bg-blue-100 flex items-center justify-center">
        [Chart Data Visualization Area]
      </div>
    </div>
  )
}
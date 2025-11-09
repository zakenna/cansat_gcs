// xbeeSimulator.js
const SerialPort = require('serialport');

// 테스트용 가상 포트 이름 (위에서 만든 가상 포트)
const portName = 'COM6'; 
const port = new SerialPort(portName, { baudRate: 9600 });

setInterval(() => {
  // 랜덤 센서 데이터 생성
  const temp = (20 + Math.random() * 10).toFixed(2);
  const humidity = (30 + Math.random() * 20).toFixed(2);
  const data = `TEMP:${temp},HUM:${humidity}\n`;

  port.write(data, (err) => {
    if (err) console.error('Error writing to port:', err);
    else console.log('Simulated data sent:', data.trim());
  });
}, 1000); // 1초마다 데이터 전송

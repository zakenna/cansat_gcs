// server/index.js - 시뮬레이터 로직을 제거하고 실제 수신 로직으로 변경

const SerialPort = require('serialport');
// SerialPort 9.x 이상 버전을 사용하는 경우 Parser는 별도의 패키지입니다. 
// FSW에서 Serial.println()을 사용하므로 @serialport/parser-readline 사용
const Readline = require('@serialport/parser-readline'); 

// --- 1. 통신 설정: 실제 환경에 맞게 변경해야 합니다 ---
// GCS 컴퓨터에 연결된 라디오 모뎀의 실제 포트 이름으로 변경하세요. 
// (예: Windows='COM3', Linux='/dev/ttyACM0', Mac='/dev/tty.usbmodemXXXX')
const portName = 'COM_GCS_RADIO'; 
// FSW의 Serial1.begin(115200)과 일치하도록 설정합니다.
const baudRate = 115200; 
// ----------------------------------------------------

// FSW의 TelemetryPacket 구조체에 정의된 필드 이름 순서
const TELEMETRY_FIELDS = [
  "TEAM_ID", "MISSION_TIME", "PACKET_COUNT", "MODE", "STATE", 
  "ALTITUDE", "TEMPERATURE", "ATM_PRESSURE", "VOLTAGE", "CURRENT", 
  "GYRO_R", "GYRO_P", "GYRO_Y", "ACCEL_R", "ACCEL_P", "ACCEL_Y", 
  "GPS_TIME", "GPS_ALTITUDE", "GPS_LATITUDE", "GPS_LONGITUDE", "GPS_SATS", "CMD_ECHO"
];

// 시리얼 포트 열기
const port = new SerialPort(portName, { baudRate: baudRate }, (err) => {
  if (err) {
    return console.error('Error opening port: ' + err.message);
  }
  console.log(`✅ Serial Port ${portName} opened successfully at ${baudRate} baud.`);
});

// Readline Parser를 사용하여 FSW가 println()으로 보낸 '\n'을 기준으로 데이터를 라인 단위로 읽습니다.
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// --- 시뮬레이션 로직 제거 ---
// 기존의 setInterval()로 랜덤 데이터를 쓰던 코드는 완전히 제거합니다.
// ----------------------------

// 데이터 수신 이벤트 핸들러
parser.on('data', (data) => {
  const telemetryString = data.toString().trim();
  
  // CSV 데이터 파싱
  const values = telemetryString.split(',');

  // 데이터 유효성 검사 (필드 수 확인)
  if (values.length !== TELEMETRY_FIELDS.length) {
    console.error(`❌ [ERROR] Invalid packet format. Expected ${TELEMETRY_FIELDS.length} fields, received ${values.length}: ${telemetryString}`);
    return;
  }
  
  // JSON 객체로 변환하여 사용하기 쉽게 만듭니다.
  const telemetryData = {};
  TELEMETRY_FIELDS.forEach((field, index) => {
    // 숫자 데이터는 float로 변환합니다.
    const floatValue = parseFloat(values[index]);
    telemetryData[field] = isNaN(floatValue) ? values[index] : floatValue;
  });

  // 수신된 텔레메트리 데이터 출력
  console.log(`Telemetry Packet Received | Count: ${telemetryData.PACKET_COUNT} | State: ${telemetryData.STATE} | Alt: ${telemetryData.ALTITUDE} m`);
  // console.log(telemetryData); // 전체 데이터는 필요에 따라 주석 해제

  // TODO:
  // 이 telemetryData 객체를 GCS 프론트엔드 (Next.js)로 실시간 전송하는 WebSocket/Socket.IO 로직을 추가해야 합니다.
});

// 에러 이벤트 처리
port.on('error', (err) => {
  console.error('🔴 [PORT ERROR]:', err.message);
});

port.on('close', () => {
  console.log('🚪 [PORT CLOSED]');
});
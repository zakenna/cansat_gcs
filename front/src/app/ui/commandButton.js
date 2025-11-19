export default function CommandButton({ onClick, children, color = 'gray' }) {
  // 색상별 스타일 매핑
  const colorVariants = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    red: "bg-red-100 hover:bg-red-200 text-red-800",
  };

  // 기본 스타일 + 선택된 색상 스타일 조합
  const className = `px-3 py-1 text-sm rounded-md shadow-sm transition ${colorVariants[color] || colorVariants.gray}`;

  return (
    <button 
      onClick={onClick} 
      className={className}
    >
      {children}
    </button>
  );
}
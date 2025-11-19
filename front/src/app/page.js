// app/page.jsx
// Server Component (Default)
import DashboardContainer from "./dashboardContainer";

export default function DashboardPage() {
  
  return (
    <div className="flex flex-col h-screen">
      {/* 상태 관리와 상호작용은 Client Component인 DashboardContainer에 위임 */}
      <DashboardContainer />
    </div>
  );
}
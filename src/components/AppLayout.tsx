import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import InjuryBadge from "./InjuryBadge";

const AppLayout = () => (
  <div className="min-h-screen bg-background pb-20">
    <InjuryBadge />
    <AppHeader />
    <main className="px-4 pt-4 space-y-4 max-w-md mx-auto">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);

export default AppLayout;

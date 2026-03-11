import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Dashboard/Topbar";

const AppLayout = () => {
  return (
    <div className="flex bg-background-light">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />
        <main className="min-h-screen p-5 pt-14 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

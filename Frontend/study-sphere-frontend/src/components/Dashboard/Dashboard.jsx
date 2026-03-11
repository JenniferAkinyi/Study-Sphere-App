import React from "react";
import WelcomeHeader from "./Components/WelcomeHeader";
import JoinedGroups from "./Components/JoinedGroups";
import RecentActivity from "./Components/RecentActivity";
import UpcomingSessions from "./Components/UpcomingSessions";
import QuickBoostCard from "./Components/QuickBoostCard";
import GoalCard from "./Components/GoalCard"

const Dashboard = () => {
  return (
    <div className="px-6 mt-10 space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[6fr_4fr]">
        <WelcomeHeader/>
        <GoalCard />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_3fr]">
        <div className="space-y-8">
          <JoinedGroups />
          <RecentActivity />
        </div>
        <div className="space-y-8">
          <UpcomingSessions />
          <QuickBoostCard />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;

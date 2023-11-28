import { Routes, Route } from "react-router-dom";
import TopNav from "../../Components/TopNav";
import SideNav from "../../Components/SideNav";
import Boards from "../Boards/Boards";
import EditBoard from "../Boards/EditBoard";
import CreateBoard from "../Boards/CreateBoard";
import Members from "../Members/Members";
import Calendar from "../Calendar/Calendar";

const Dashboard: React.FC = () => {
  return (
    <>
      <TopNav />
      <SideNav />
      <Routes>
        <Route path="/boards" element={<Boards />} />
        <Route path="/edit-board" element={<EditBoard />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
};

export default Dashboard;

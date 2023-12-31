import { Routes, Route } from "react-router-dom";
import { BoardProvider } from "../../Context/BoardProvider";
import TopNav from "../../Components/TopNav";
import SideNav from "../../Components/SideNav";
import Boards from "../Boards/Boards";
import EditBoard from "../Boards/EditBoard";
import CreateBoard from "../Boards/CreateBoard";
import Members from "../Members/Members";
import Calendar from "../Calendar/Calendar";
import MyBoard from "../Boards/MyBoard";

const Dashboard: React.FC = () => {
  return (
    <>
      <BoardProvider>
        <TopNav />
        <SideNav />
        <Routes>
          <Route path="/boards" element={<Boards />} />
          <Route path="/edit-board" element={<EditBoard />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/myboard/:id" element={<MyBoard />} />
        </Routes>
      </BoardProvider>
    </>
  );
};

export default Dashboard;

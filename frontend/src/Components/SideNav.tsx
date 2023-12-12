import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance, getMemberships, fetchBoards } from "../Utils/apiServices";
import { MdAssignment, MdGroups2, MdCalendarMonth } from "react-icons/md";
import { useAuth } from "../Hooks/useAuth";

interface Membership {
  board: number;
  user: number;
}

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user: number;
}

const SideNav: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const all_members = await getMemberships();
      setMemberships(all_members);

      const all_boards = await fetchBoards();
      setAllBoards(all_boards);
    };
    fetchData();
  }, []);

  const filteredMemberships = memberships.filter(
    (membership) => membership.user === user?.id
  );

  const boards = allBoards.filter((board) => {
    return filteredMemberships.some((member) => member.board === board.id);
  });

  const handleLogout = async () => {
    await instance.post("/auth/logout/");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-72 h-full fixed flex flex-col items-start top-20 left-0 bg-white">
      <div
        className="flex items-center pt-5 pl-5 cursor-pointer"
        onClick={() => navigate("/boards")}
      >
        <MdAssignment className="text-2xl" />
        <p className="text-2xl font-semibold pl-5">Boards</p>
      </div>
      <div
        className="flex items-center pt-5 pl-5 cursor-pointer"
        onClick={() => navigate("/members")}
      >
        <MdGroups2 className="text-2xl" />
        <p className="text-2xl font-semibold pl-5">Members</p>
      </div>
      <div
        className="flex items-center pt-5 pl-5 cursor-pointer"
        onClick={() => navigate("/calendar")}
      >
        <MdCalendarMonth className="text-2xl" />
        <p className="text-2xl font-semibold pl-5">Calendar</p>
      </div>
      <hr className="w-11/12 self-center my-5" />
      <div>
        <p className="text-3xl font-semibold pl-5">Your boards</p>

        {boards?.map((board) => (
          <div
            key={board.id}
            onClick={() =>
              navigate(`/myboard/${board.id}`, { state: board.id })
            }
            className="w-full flex items-center pt-5 pl-5 cursor-pointer"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300"></div>
            <p className="text-2xl font-semibold pl-5">{board.title}</p>
          </div>
        ))}
      </div>
      <div className="w-72 h-16 flex items-center justify-center fixed bottom-0 left-0 shadow-inner shadow-slate-500">
        <button className="text-2xl font-semibold" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;

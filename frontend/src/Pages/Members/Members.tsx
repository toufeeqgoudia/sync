import { useState, useEffect } from "react";
import { useBoards } from "../../Hooks/useBoards";
import { getMemberships } from "../../Utils/apiServices";

interface Memberships {
  id: number;
  board: [];
  user: [];
}

const Members: React.FC = () => {
  const [memberships, setMemberships] = useState<Memberships[]>([])
  const { boards } = useBoards();

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getMemberships()
      setMemberships(response)
    }

    fetchMembers()
  }, [])

  console.log(memberships)
  console.log('boards', boards)

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-8 flex justify-evenly items-start bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-96 h-96">
        <p className="text-lg text-white font-medium mb-2">Select board:</p>
        <select className="w-80 p-2 mb-6 text-sm outline-none rounded-md bg-white">
          <option value="">Select a Board</option>
          {boards?.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <p className="text-lg text-white font-medium mb-2">Invite members:</p>
        <form className="flex items-center">
          <input
            className="w-80 p-2 text-sm outline-none rounded-md bg-white"
            type="search"
          />
          <button className="w-12 h-9 ml-2 bg-white rounded-md">Add</button>
        </form>
      </div>

      <div className="w-96 h-96 flex flex-col bg-white rounded-md"></div>
    </div>
  );
};

export default Members;

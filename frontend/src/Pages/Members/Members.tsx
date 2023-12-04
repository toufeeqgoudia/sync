import { useState, useEffect } from "react";
import { useBoards } from "../../Hooks/useBoards";
import { getMemberships, addMembership } from "../../Utils/apiServices";
import SearchUsers from "../../Components/SearchUsers";

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  colour: string;
}

interface Memberships {
  id: number;
  board: Board;
  user: User;
}

const Members: React.FC = () => {
  const [memberships, setMemberships] = useState<Memberships[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [fetchError, setFetchError] = useState<string>("");
  const { boards } = useBoards();

  useEffect(() => {
    const fetchData = async () => {
      const members = await getMemberships();
      setMemberships(members);
    };

    fetchData();
  }, []);

  const filteredMemberships = memberships.filter(
    (membership) => membership.board.id === selectedBoard?.id
  );

  const handleSearchResults = (results: User[]) => {
    setSearchResults(results);
  };

  console.log("selectedBoard: ", selectedBoard);
  console.log("selectedUser: ", selectedUser);

  const filteredUser = filteredMemberships.some(
    (member) => member.user.id === selectedUser?.id
  )

  console.log('filteredUser: ', filteredUser)

  const handleAddUserToBoard = async () => {
    try {
      if (selectedBoard === undefined || selectedBoard === null || selectedBoard.id === 0) {
        setFetchError("*Please select a board.");
      } else if (selectedUser === undefined || selectedUser === null || selectedUser.id === 0) {
        setFetchError("*This user already belongs to this board.");
      }else if (filteredUser === true) {
        setFetchError("*This user already belongs to this board.");
      } else if (filteredUser === false) {
        setFetchError("")

        await addMembership({ user: selectedUser, board: selectedBoard });

        const updatedMembership = await getMemberships()
        setMemberships(updatedMembership)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log('fetchError: ', fetchError)

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-8 flex justify-evenly items-start bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-96 h-96">
        <p className="text-lg text-white font-medium mb-2">Select board:</p>
        <select
          className="w-80 p-2 mb-6 text-sm outline-none rounded-md bg-white"
          onChange={(e) => setSelectedBoard(e.target.value)}
        >
          <option value="">Select a Board</option>
          {boards?.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <p className="text-lg text-white font-medium mb-2">Invite members:</p>

        {fetchError && <p className="text-white text-xs my-2">{fetchError}</p>}

        <SearchUsers handleSearchResults={handleSearchResults} />

        {searchResults.length > 0 && (
          <ul className="mt-10">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="w-80 p-2 my-2 text-sm flex justify-between bg-white rounded-md"
              >
                {user.email}
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    handleAddUserToBoard()
                  }}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-96 h-96 p-3 flex flex-col bg-white rounded-md">
        <p className="text-lg font-medium mb-2">Members:</p>
        <ul>
          {filteredMemberships.map((member) => (
            <li key={member.user.id}>{member.user.fullname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Members;

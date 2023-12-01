import { ChangeEvent, useState, useEffect } from "react";
import Fuse from "fuse.js";
import { searchUsers } from "../Utils/apiServices";

interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  colour: string;
}

interface SearchUserProps {
  handleSearchResults: (results: User[]) => void;
}

const SearchUsers: React.FC<SearchUserProps> = ({ handleSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await searchUsers();
      setAllUsers(response.users);
    };

    fetchData();
  }, []);

  const fuseOptions = {
    keys: ["email"],
    threshold: 0.3,
  };

  const fuse = new Fuse(allUsers, fuseOptions);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    performSearch(e.target.value);
  };

  const performSearch = (term: string) => {
    setSearchTerm(term);

    if (term === "") {
      handleSearchResults([]);
      return;
    }

    let results = allUsers.slice();

    if (term) {
      const fuseResults = fuse.search(term);
      results = fuseResults.map((result) => result.item);
    }

    handleSearchResults(results);
  };

  return (
    <form className="flex items-center">
      <input
        className="w-80 p-2 text-sm outline-none rounded-md bg-white"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  );
};

export default SearchUsers;

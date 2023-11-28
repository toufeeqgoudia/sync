

const Members: React.FC = () => {
  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-8 flex justify-evenly items-start bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-96 h-96">
        <p>Select board:</p>
        <input  />
        <p>Invite members:</p>
        <input type="search" />
        <button>Invite</button>
      </div>

      <div className="w-96 h-96 bg-white">

      </div>
    </div>
  )
}

export default Members

// I would like to make a React component where a user selects a board and can search for other registered users and add them to that board. Can you show me how to do this?
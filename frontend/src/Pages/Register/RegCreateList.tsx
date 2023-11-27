import { FaArrowRight } from "react-icons/fa";

const RegCreateList: React.FC = () => {
  return (
    <div className="max-w-screen min-h-screen px-10 flex flex-col pt-20 items-center bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
    <h2 className="text-6xl text-white font-bold">Welcome to Sync ツ</h2>

    <div className="w-96 h-full mt-24">
      <p className="text-white text-lg font-semibold">Create a list</p>
      <p className="text-white">
        A list is the status of tasks created for a project.
      </p>
      <form className="w-full h-full mt-5">
        <p className="text-white mb-2">First list (not started):</p>
        <input className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white" placeholder="e.g. To Do" />
        <p className="text-white mb-2">Second list (in progress):</p>
        <input className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white" placeholder="e.g. Doing" />
        <p className="text-white mb-2">Third list (completed):</p>
        <input className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white" placeholder="e.g. Done" />
        <div className="flex items-center absolute right-20 bottom-10">
          <button type="submit" className="text-white font-bold">NEXT</button>
          <FaArrowRight className="text-white font-bold ml-2" />
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegCreateList
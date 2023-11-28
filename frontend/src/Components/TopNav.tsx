import { useAuth } from "../Hooks/useAuth"

const TopNav: React.FC = () => {
    const { user } = useAuth()

  return (
    <div className="w-screen h-20 bg-white px-5 flex items-center justify-between shadow-md shadow-slate-500 fixed top-0 right-0 left-0 z-20">
        <h2 className="text-5xl font-bold">Sync ツ</h2>
        <div className="bg-red-500 py-1 px-3 rounded-full">
            <p className="text-lg">{user?.username}</p>
        </div>
    </div>
  )
}

export default TopNav
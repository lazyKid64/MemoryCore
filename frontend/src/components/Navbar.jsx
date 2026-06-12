import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-base-100 border-b border-base-content/10 sticky top-0 z-50 backdrop-blur-sm bg-base-100/90">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="group">
            <h1 className="text-2xl font-bold text-primary font-mono tracking-tight group-hover:text-primary/80 transition-colors">
              MemoryCore
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-base-content/50 hidden sm:inline-block">
                Hi, <span className="text-primary font-semibold">{user.username}</span>
              </span>
            )}
            <Link to="/create" className="btn btn-primary btn-sm gap-1">
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10 gap-1"
            >
              <LogOutIcon className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
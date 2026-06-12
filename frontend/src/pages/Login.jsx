import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [token, navigate]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const targetUrl = isRegister ? '/auth/register' : '/auth/login';

    try {
      const res = await api.post(targetUrl, { username, password });
      login(res.data.user, res.data.token);
      toast.success(isRegister ? 'Account created successfully!' : 'Welcome back!');
      navigate('/home');
    } catch (err) {
      const message = err.response?.data?.message || "Authentication failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (token) return null;

  return (
    <div className="min-h-screen flex bg-base-300">
      {/* LEFT SIDE — Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">
        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight mb-10">
            Welcome to <span className="text-primary">MemoryCore</span>
          </h1>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-base-content/70 mb-1.5 block">
                Username
              </label>
              <input
                id="auth-username"
                type="text"
                className="input input-bordered w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:outline-none h-12 text-base-content placeholder:text-base-content/30"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-base-content/70 mb-1.5 block">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                className="input input-bordered w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:outline-none h-12 text-base-content placeholder:text-base-content/30"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              id="auth-submit"
              type="submit"
              className="btn btn-primary w-full h-12 text-base font-semibold mt-2 no-animation"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : null}
              {loading
                ? (isRegister ? "Creating Account..." : "Signing In...")
                : (isRegister ? "Sign Up" : "Login in")}
            </button>
          </form>

          <p className="mt-6 text-sm text-base-content/50">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => { setIsRegister(!isRegister); setUsername(''); setPassword(''); }}
              className="text-primary font-semibold hover:underline"
              disabled={loading}
            >
              {isRegister ? "Login" : "Sign Up!"}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — Hero Image */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden">
        <img
          src="/memorycore-hero.png"
          alt="MemoryCore cyberpunk workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle gradient overlay to blend edge with left panel */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-300 to-transparent" />
      </div>
    </div>
  );
};

export default Login;
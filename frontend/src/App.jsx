import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
          <Route path="/note/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1d232a',
              color: '#a6adbb',
              border: '1px solid rgba(166,173,187,0.1)',
            },
            success: {
              iconTheme: { primary: '#36d399', secondary: '#1d232a' },
            },
            error: {
              iconTheme: { primary: '#f87272', secondary: '#1d232a' },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
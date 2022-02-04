import { useContext, useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ShowMessage from "./components/Layout/ShowMessage";
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthContext from "./store/auth-context";

function App() {
  const { isLoggedIn, setShowMessageRef } = useContext(AuthContext);
  const showMessageRef = useRef();
  useEffect(() => {
    setShowMessageRef(showMessageRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <ShowMessage ref={showMessageRef} delay={4000} />
    </Layout>
  );
}

export default App;

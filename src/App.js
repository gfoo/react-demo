import { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthContext from "./store/auth-context";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!isLoggedIn && (
          <Fragment>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Fragment>
        )}
      </Routes>
    </Layout>
  );
}

export default App;

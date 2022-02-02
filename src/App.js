import { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!authCtx.isLoggedIn && (
          <Fragment>
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/*" element={<Navigate to="/login" />} />
          </Fragment>
        )}
        {authCtx.isLoggedIn && (
          <Fragment>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Fragment>
        )}
      </Routes>
    </Layout>
  );
}

export default App;

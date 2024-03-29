import { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import LogPage from "./components/LogPage/LogPage";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newInfo } from "./features/auth/authSlice";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Verify from "./components/Verify/Verify";
import Spinner from "./components/Sys/Spinner/Spinner";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(newInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Spinner visible={isLoading} />
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/confirm/:token" element={<Verify />} />
            <Route path="*" element={<LogPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

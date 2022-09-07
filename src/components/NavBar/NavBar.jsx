import { Button, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBarMenu from "./NavBarMenu/NavBarMenu";
import CreatePost from "./CreatePost/CreatePost";
import "./NavBar.scss";
import Cantastik from "../../assets/Cantastik.png";
import { PlusSquareOutlined } from "@ant-design/icons";
import { findByTitle, getPosts } from "../../features/posts/postsSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { Search } = Input;
  const navigate = useNavigate();

  const onSearch = async () => {
    if (!searchValue) {
      await dispatch(getPosts());
    } else {
      navigate("/");
      const search = searchValue;
      setSearchValue("");
      await dispatch(findByTitle(search));
    }
  };

  return (
    <nav className="NavBar">
      <div
        className="NavBar__bar"
        style={{ width: user ? "min(95vw, 130rem)" : "95vw" }}
      >
        {user ? (
          <Link to={"/"} onClick={() => dispatch(getPosts())}>
            <img className="NavBar__icon" src={Cantastik} alt="Cantastik" />
          </Link>
        ) : (
          <img src={Cantastik} alt="Cantastik" />
        )}
        {user ? (
          <>
            <Search
              placeholder="Buscar"
              onSearch={onSearch}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              maxLength={20}
              style={{ flex: 1, maxWidth: "27rem" }}
            />
            <div className="NavBar__bar--right">
              <Button
                type="text"
                onClick={() => setCreatePostVisible(true)}
                icon={<PlusSquareOutlined />}
              />
              <NavBarMenu />
              <CreatePost
                visible={createPostVisible}
                setCreatePostVisible={setCreatePostVisible}
              />
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;

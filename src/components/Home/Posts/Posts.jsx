import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from "../../../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post/Post";
import "./Posts.scss";

const Posts = () => {
  const { posts, countTotalPosts, loads } = useSelector((state) => state.posts);
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();

  const allPosts = posts?.map((element, i) => (
    <Post item={{ ...element, i }} />
  ));

  const nextPage = async () => {
    if (loads.home) {
      return;
    }
    await setPage(page + 1);
    await dispatch(getPosts(page));
  };

  return (
    <section className="Posts" style={{ marginBottom: "10rem" }}>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={posts?.length}
        next={nextPage}
        hasMore={(page - 1) * 10 <= countTotalPosts}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>
              {posts.length === 0
                ? "Cargando..."
                : "Ya no hay mas posts... ¿Porque no crea uno ahora?"}
            </b>
          </p>
        }
      >
        {allPosts}
      </InfiniteScroll>
    </section>
  );
};

export default Posts;

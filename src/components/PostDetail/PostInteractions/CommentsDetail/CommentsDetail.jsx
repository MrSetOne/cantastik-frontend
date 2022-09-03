import { MessageOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Empty, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addComment } from "../../../../features/posts/postsSlice";

const API_URL = process.env.REACT_APP_API_URL;

const CommentsDetail = ({ comments, postId }) => {
  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState("");

  const sendComment = async (e) => {
    await e.preventDefault();
    const comment = commentValue;
    await setCommentValue("");
    await dispatch(addComment({ postId, value: comment }));
    e.target[0].value = "";
  };

  const printComments = comments.map((element) => {
    return (
      <div key={element._id} style={{ display: "flex", gap: "1rem" }}>
        <Link to={`/profile/${element.author._id}`}>
          {element.author.img ? (
            <Avatar src={element.author.img} />
          ) : (
            <Avatar>{element.author.username.substring(0, 1)}</Avatar>
          )}
        </Link>

        <p style={{ marginTop: ".5rem" }}>
          <Link
            style={{ color: "black", fontWeight: 700 }}
            to={`/profile/${element.author._id}`}
          >
            {element.author.username}
          </Link>{" "}
          {element.comment}
        </p>
      </div>
    );
  });

  return (
    <div className="CommentsDetail" style={{ width: "100%" }}>
      {comments.length !== 0 ? (
        <div
          className="Comments__Container"
          style={{
            overflow: "auto",
            height: "calc(100vh - 30rem)",
            marginBottom: "1rem",
            paddingRight: "1rem",
          }}
        >
          {printComments}
        </div>
      ) : (
        <Empty
          style={{ height: "calc(100vh - 30rem)" }}
          description={
            <span>
              Nadie ha comentado aun en este post,
              <br />
              <b>¡Se el primero en hacerlo!</b>
            </span>
          }
        />
      )}
      <form style={{ display: "flex" }} onSubmit={(e) => sendComment(e)}>
        <Input
          placeholder="Escribe tu comentario"
          bordered={false}
          name="comment"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          prefix={<MessageOutlined />}
        />
        <Button type="primary" icon={<SendOutlined />} htmlType="submit" />
      </form>
    </div>
  );
};

export default CommentsDetail;

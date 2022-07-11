import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../../features/auth/authSlice";

const Verify = () => {
  const { token } = useParams();

  const { isConfirmed } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const sendVerify = async () => {
    await dispatch(verify(token));
    setLoaded(true);
  };

  useEffect(() => {
    sendVerify();
  }, [token]);

  return (
    <div
      className="Verify"
      style={{
        minHeight: "calc(100vh - 5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loaded ? (
        isConfirmed ? (
          <Result
            status="success"
            title="Has confirmado correctamente tu correo"
            subTitle="Dale click al boton de bajo para ser redirigido a la pagina de login :)"
            extra={[
              <Button type="primary" onClick={() => navigate("/")}>
                Login
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="404"
            title="404"
            subTitle="Parece que el enlace al que intentas acceder es erroneo"
            extra={
              <Button type="primary" onClick={() => navigate("/")}>
                Ir al Home
              </Button>
            }
          />
        )
      ) : (
        <div
          className="spinner__container"
          style={{ display: !loaded ? "flex" : "none" }}
        >
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;

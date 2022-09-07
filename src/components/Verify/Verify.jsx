import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../../features/auth/authSlice";
import Spinner from "../Sys/Spinner/Spinner";

const Verify = () => {
  const { token } = useParams();

  const { isConfirmed, loads } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sendVerify = async () => {
    await dispatch(verify(token));
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
      {!loads.user ? (
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
        <Spinner visible={loads.user} />
      )}
    </div>
  );
};

export default Verify;

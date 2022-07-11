import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InitialConfig from "./InitialConfig/InitialConfig";
import { updateUser, wellcomeEnd } from "../../../features/auth/authSlice";

const Wellcomer = () => {
  const [configuring, setConfiguring] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div
      className="Wellcomer"
      style={{
        minHeight: "calc(100vh - 5rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!configuring ? (
        <div>
          <h1>¡Bienvenido {user.username}!</h1>
          <p>
            Sabemos que tienes muchas ganas de empezar, pero antes de ello...
          </p>
          <p>¿Deseas terminar de configurar tu perfil?</p>
          <Button type="primary" onClick={() => setConfiguring(true)}>
            Si
          </Button>
          <Button onClick={() => dispatch(wellcomeEnd())}>No</Button>
        </div>
      ) : (
        <InitialConfig />
      )}
    </div>
  );
};

export default Wellcomer;

import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InitialConfig from "./InitialConfig/InitialConfig";
import { wellcomeEnd } from "../../../features/auth/authSlice";
import { motion } from "framer-motion";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
              marginBottom: "4rem",
              fontSize: "7rem",
            }}
            transition={{ duration: 0.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ¡Bienvenido {user.username}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, marginBottom: 0, fontSize: "4rem" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Sabemos que tienes muchas ganas de empezar, pero antes de ello...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30, fontSize: "4rem" }}
            transition={{ duration: 0.5, delay: 1 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ¿Deseas terminar de configurar tu perfil?
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              fontSize: "4rem",
            }}
            style={{ display: "flex", gap: "10rem" }}
            transition={{ duration: 0.5, delay: 1.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              style={{ width: "15rem", height: "10rem", fontSize: "5rem" }}
              type="primary"
              onClick={() => setConfiguring(true)}
            >
              Si
            </Button>
            <Button
              style={{ width: "15rem", height: "10rem", fontSize: "5rem" }}
              onClick={() => dispatch(wellcomeEnd())}
            >
              No
            </Button>
          </motion.div>
        </div>
      ) : (
        <InitialConfig />
      )}
    </div>
  );
};

export default Wellcomer;

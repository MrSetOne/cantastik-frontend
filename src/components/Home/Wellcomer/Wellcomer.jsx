import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InitialConfig from "./InitialConfig/InitialConfig";
import { wellcomeEnd } from "../../../features/auth/authSlice";
import { motion } from "framer-motion";
import "./Wellcomer.scss";

const Wellcomer = () => {
  const [configuring, setConfiguring] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="Wellcomer">
      {!configuring ? (
        <div className="Wellcomer__Container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ¡Bienvenido {user.username}!
          </motion.h1>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Sabemos que tienes muchas ganas de empezar, pero antes de ello...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 1 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ¿Deseas terminar de configurar tu perfil?
            </motion.p>
          </div>
          <motion.div
            className="wellcomer__btns"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              type="primary"
              onClick={() => setConfiguring(true)}
              size="large"
            >
              Si
            </Button>
            <Button onClick={() => dispatch(wellcomeEnd())} size="large">
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

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import "./LogPage.scss";
import { notification } from "antd";
import cantastikGraff from "../../assets/Cantastikgraff.png";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetNotif } from "../../features/auth/authSlice";

const LogPage = () => {
  const [needSignUp, setNeedSignUp] = useState(false);
  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
      setTimeout(() => {
        dispatch(resetNotif());
      }, 2000);
    }
    if (isSuccess) {
      notification.success({
        message: "¡Ya casi estamos!",
        description: message,
      });
      setNeedSignUp(false);
      setTimeout(() => {
        dispatch(resetNotif());
      }, 2000);
    }
  }, [isError, isSuccess, message]);

  return (
    <section className="LogPage">
      <div className="LogPage__Image">
        <motion.img
          src={cantastikGraff}
          alt="Cantastik"
          transition={{ repeat: Infinity, repeatDelay: 3 }}
          animate={{
            filter: [
              "drop-shadow(5px 0px 0px #FFFFFF)",
              "drop-shadow(-1px 0px 5px #FFFFFF)",
              "drop-shadow(5px -1px 0px #FFFFFF)",
              "drop-shadow(-3px 2px 5px #FFFFFF)",
              "drop-shadow(5px 1px 0px #FFFFFF)",
              "drop-shadow(-5px 0px 5px #FFFFFF)",
              "drop-shadow(0px 3px 0px #FFFFFF)",
              "drop-shadow(2px 1px 5px #FFFFFF)",
              "drop-shadow(5px 5px 5px #000000)",
            ],
          }}
        />
      </div>
      <div className="LogPage__Forms" style={{ position: "relative" }}>
        <AnimatePresence>
          {needSignUp && (
            <motion.div
              style={{ position: "absolute", width: "70%" }}
              key={"signUp"}
              initial={{
                x: 0,
                zIndex: 9,
                boxShadow: "none",
              }}
              animate={{
                zIndex: 10,
                transition: { delay: 0.6 },
              }}
              transition={{ duration: 1.2 }}
              exit={{
                x: [0, -370, 0],
                boxShadow: [
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "19px 19px 15px 0px rgba(0,0,0,0.45)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                ],
                scale: [1, 1.13, 1, 1],
                zIndex: 10,
              }}
            >
              <SignUp setNeedSignUp={setNeedSignUp} />
            </motion.div>
          )}
          {!needSignUp && (
            <motion.div
              style={{ position: "absolute", width: "70%" }}
              key={"logIn"}
              initial={{
                x: 0,
                zIndex: 9,
                boxShadow: "none",
              }}
              animate={{
                zIndex: 10,
                transition: { delay: 0.6 },
              }}
              transition={{ type: "spring", bounce: 1, duration: 1.2 }}
              exit={{
                x: [0, -370, 0],
                boxShadow: [
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "19px 19px 15px 0px rgba(0,0,0,0.45)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px 0px rgba(0,0,0,0)",
                ],
                scale: [1, 1.13, 1, 1],

                zIndex: 10,
              }}
            >
              <Login setNeedSignUp={setNeedSignUp} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LogPage;

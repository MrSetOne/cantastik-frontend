import { useSelector } from "react-redux";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import "./LogPage.scss";
import cantastikGraff from "../../assets/Cantastikgraff.png";
import { AnimatePresence, motion } from "framer-motion";

const LogPage = () => {
  const { needSignUp } = useSelector((state) => state.interfaces);

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
              <SignUp />
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
              <Login />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LogPage;

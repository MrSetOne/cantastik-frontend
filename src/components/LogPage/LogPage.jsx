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
        <img src={cantastikGraff} alt="Cantastik" />
      </div>
      <div className="LogPage__Forms" style={{ position: "relative" }}>
        <AnimatePresence>
          {needSignUp && (
            <motion.div
              style={{ position: "absolute", width: "70%" }}
              key={"signUp"}
              initial={{ x: 0, zIndex: 9 }}
              animate={{ zIndex: 10, transition: { delay: 0.5 } }}
              transition={{ duration: 1 }}
              exit={{ x: [0, -370, 0], zIndex: 10 }}
            >
              <SignUp />
            </motion.div>
          )}
          {!needSignUp && (
            <motion.div
              style={{ position: "absolute", width: "70%" }}
              key={"logIn"}
              initial={{ x: 0, zIndex: 9 }}
              animate={{ zIndex: 10, transition: { delay: 0.5 } }}
              transition={{ type: "spring", bounce: 1, duration: 1 }}
              exit={{ x: [0, -370, 0], zIndex: 10 }}
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

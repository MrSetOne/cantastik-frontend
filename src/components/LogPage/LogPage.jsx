import { useSelector } from "react-redux"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"



const LogPage = () => {
  
  
  const { needSignUp } = useSelector((state) => state.interfaces)






  return (
    <section className="LogPage">
      {needSignUp?<Login/>:<SignUp/>}
        
        
    </section>
  )
}

export default LogPage
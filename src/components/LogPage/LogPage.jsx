import { useSelector } from "react-redux"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import './LogPage.scss'



const LogPage = () => {
    
  const { needSignUp } = useSelector((state) => state.interfaces)

  return (
    <section className="LogPage">
      <div className="LogPage__Image">
        <h2>Vive</h2>
        <h2>tu momento!</h2>
      </div>
      <div className="LogPage__Forms">
        {needSignUp?<SignUp/>:<Login/>}
      </div>
    </section>
  )
}

export default LogPage
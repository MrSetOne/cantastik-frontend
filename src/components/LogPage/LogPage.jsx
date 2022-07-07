import { useSelector } from "react-redux"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import './LogPage.scss'
import cantastikGraff from '../../assets/Cantastikgraff.png'



const LogPage = () => {
    
  const { needSignUp } = useSelector((state) => state.interfaces)

  return (
    <section className="LogPage">
      <div className="LogPage__Image">
        <img src={cantastikGraff} alt="Cantastik" />
      </div>
      <div className="LogPage__Forms">
        {needSignUp?<SignUp/>:<Login/>}
      </div>
    </section>
  )
}

export default LogPage
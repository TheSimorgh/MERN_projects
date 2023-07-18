import { Link } from "react-router-dom"
import routes from "../../../routes/routes"


const PrivateNavbar = () => {
  return (
    <div className="sticky bg-blue-500 w-full text-white " > 
    <Link to={"/"} >PrivateNavbar</Link>
    <div className="flex justify-between" >
    {routes.map((e,i)=>(
         <Link key={i} to={e.path}>{i}</Link>
    ))}
    </div>
    </div>

  )
}

export default PrivateNavbar
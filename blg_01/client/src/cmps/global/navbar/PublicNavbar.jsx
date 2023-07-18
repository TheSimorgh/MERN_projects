import { Link } from "react-router-dom"
import routes from "../../../routes/routes"

const PublicNavbar = () => {
  return (
    <div className="sticky bg-blue-500 w-full text-white m-10" > 
    <div>PublicNavbar</div>
    {routes.map((e,i)=>(
         <Link key={i} to={e.path}>{e.path}</Link>
    ))}
    </div>

  )
}

export default PublicNavbar

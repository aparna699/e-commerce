import { Outlet } from "react-router-dom";


const Home = () => {
    return ( 
        <div className="page">
            <Outlet/>
            Home page
        </div>
     );
}
 
export default Home;
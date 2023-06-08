import { Outlet, useNavigation } from "react-router-dom"
import SearchBar from "../core/SearchBar"
import './HomePage.sass'

function HomePage() {
    const navigation = useNavigation();
    const state = navigation.state
    const classLoading = state === "loading" ? "loading" : "hide-loading"
          
    return (
    <>
            <div className={classLoading}>
            <div className="loader"></div>
        </div>
        <SearchBar></SearchBar>

        <div className="home-page-body-container">
            <Outlet/>
        </div>
    </>
    )
}

export default HomePage
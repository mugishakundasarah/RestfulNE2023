import jwtDecode from "jwt-decode"

const Header = () => {
    let userData = jwtDecode(localStorage.getItem('token'))
    return (
        <div className="flex flex-wrap shadow-md justify-between py-4 px-5"> 
            <div className="flex flex-col lg:flex-row items-center">
                <img src="Logo.svg" alt="Logo"/>
                <p className="whitespace-nowrap ml-4">
                    <span className="text-primary font-bold">System admin</span>
                    <span className="text-secondary font-bold">/{userData?.name}</span>
                </p>
            </div>
            <div className="flex items-center">
                <p className="text-secondary mr-2">Logout </p>
                <img src="Logout.svg" alt="Logout"/>
            </div>
        </div>
    )
}

export default Header
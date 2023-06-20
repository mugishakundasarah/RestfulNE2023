const Header = () => {
    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return (
        <div className="flex flex-wrap shadow-md justify-between py-1 px-5"> 
            <div className="flex flex-col lg:flex-row items-center">
                <img src="rtb.svg" alt="Logo"/>
            </div>
            <div className="flex items-center cursor-pointer" onClick={logout}>
                <p className="text-secondary mr-2">Logout </p>
                <img src="Logout.svg" alt="Logout"/>
            </div>
        </div>
    )
}

export default Header
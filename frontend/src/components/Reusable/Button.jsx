import { BeatLoader, SyncLoader } from "react-spinners"

const Button = ({
    name,
    className,
    loading = false,
    handleClick 
}) => (
    <button  
        disabled={loading}
        onClick={handleClick}
        className={`w-full py-3 px-4 rounded mt-2 text-white font-bold text-sm whitespace-nowrap ${className}`}
    >{loading ? <BeatLoader color="white" size={10}/> : name }</button>
)

export default Button
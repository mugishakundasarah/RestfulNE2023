import { Close } from "@mui/icons-material"
import Input from "../Reusable/Input"
import Button from "../Reusable/Button"
import { useState } from "react"
import {FaTimes} from "react-icons/fa"
import axios from "axios"
import { BASE_URL } from "../../utils/BaseUrl"
import authHeader from "../../utils/BearerAuth"
import { toast } from "react-toastify"


const RegisterOwner = ({closeModal}) => {
    const [loading, setLoading] = useState(false)
    const [ownerData, setOwnerData] = useState({
        name: "",
        nationalId: "",
        phoneNumber: "",
        address: ""
    })
    let [errors, setErrors] = useState({
        nationalId: "",
        phoneNumber: ""
    })

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setOwnerData({ ...ownerData, [name]: value })
        e.preventDefault()
        switch (name) {
          case "phoneNumber":
              errors.phoneNumber = value.length != 10 ? ' Phone number must be 10 characters long ' : '';
            break;
          case 'nationalId':
            errors.nationalId = value.length != 16 ? ' National Id should be 16 characters long ' : '';
            break;
        }
        setErrors({ ...errors })
    };

    const handleSubmit = async() => {
        try{
            setLoading(true)
            const result = await axios.post(`${BASE_URL}/owner`, ownerData,  {headers: authHeader()})
            if(result.data.status === 200){
                toast.success(result.data.message)
                closeModal()
            }else{
                toast.error(submitData.data.message);
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            setLoading(false)
            toast.err(err)
            closeModal()
        }
    
    }

    return (
        <div className="bg-white rounded-t-3xl flex flex-col items-center w-[90%] lg:w-[40%]">
            <div className="flex bg-primary rounded-t-3xl w-full py-6 relative justify-center">
                <h1 className="text-white font-bold">Register Vehicle Owner</h1>
                <FaTimes
                  className="text-white absolute right-4 top-6 cursor-pointer"
                  size={20}
                  onClick={closeModal}
                ></FaTimes>
            </div>
            <div className="w-[90%] xl:w-[50%] mt-12">
                <div>
                    <Input 
                        name={"name"} 
                        type={"text"}
                        placeholder={""}
                        labelName={"Name"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={ownerData.name}
                        value={ownerData.name}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"phoneNumber"} 
                        type={"text"}
                        placeholder={""}
                        labelName={"Phone Number"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={ownerData.phoneNumber}
                        value={ownerData.phoneNumber}
                        error={errors.phoneNumber}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"nationalId"} 
                        type={"text"}
                        placeholder={""}
                        labelName={"National ID"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={ownerData.nationalId}
                        value={ownerData.nationalId}
                        error={errors.nationalId}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"address"} 
                        type={"text"}
                        placeholder={""}
                        labelName={"Address"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={ownerData.address}
                        value={ownerData.address}
                    />
                </div>
                <div className="my-10">
                    <Button
                        className="bg-primary"
                        name={"Register"}
                        loading={loading}
                        handleClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterOwner
import Input from "../Reusable/Input"
import Button from "../Reusable/Button"
import {  useState } from "react"
import {FaTimes} from "react-icons/fa"
import axios from "axios"
import { BASE_URL } from "../../utils/BaseUrl"
import authHeader from "../../utils/BearerAuth"
import { toast } from "react-toastify"
import { validEmailRegex } from "../../utils/validEmailRegex"


const RegisterEmployee = ({closeModal, fetchEmployees}) => {
    const [loading, setLoading] = useState(false)
    const [employeeData, setEmployeeData] = useState({
        firstName: "",
        lastName: "",
        nationalId: "",
        telephone: "",
        email: "",
        department: "",
        position: "",
        laptopManufacturer: "",
        laptopModel: "",
        serialNumber: ""
    })

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        nationalId: "",
        telephone: "",
        email: "",
        department: "",
        position: "",
        laptopManufacturer: "",
        laptopModel: "",
        serialNumber: ""
    })

    const inputHandler = (e) => {
        e.preventDefault()
        var name = e.target.name;
        var value = e.target.value;
        setEmployeeData({ ...employeeData, [name]: value })
        switch(name){
            case "manufactureYear":
    error.manufactureYear = isNaN(value) ? "Enter a valid year" : "";
    break;
  case "firstName":
    error.firstName = value.trim().length === 0 ? "First name is required" : "";
    break;
  case "lastName":
    error.lastName = value.trim().length === 0 ? "Last name is required" : "";
    break;
  case "nationalId":
    error.nationalId =
      value.trim().length !== 16 ? "National ID must be 16 characters long" : "";
    break;
  case "telephone":
    error.telephone =
      value.trim().length !== 10 ? "Telephone must be 10 characters long" : "";
    break;
  case "email":
    error.email = !validEmailRegex.test(value) ? "Enter a valid email address" : "";
    break;
  case "department":
    error.department = value.trim().length === 0 ? "Department is required" : "";
    break;
  case "position":
    error.position = value.trim().length === 0 ? "Position is required" : "";
    break;
  case "laptopManufacturer":
    error.laptopManufacturer =
      value.trim().length === 0 ? "Laptop manufacturer is required" : "";
    break;
  case "laptopModel":
    error.laptopModel = value.trim().length === 0 ? "Laptop model is required" : "";
    break;
  case "serialNumber":
    error.serialNumber =
      value.trim().length === 0 ? "Serial number is required" : "";
    break;
  default:
    break;
        }
        setError({...error})
    };


    const handleSubmit = async() => {
        try{
            setLoading(true)
            const result = await axios.post(`${BASE_URL}/employees`, employeeData,  {headers: authHeader()})
            if(result.data.status === 200){
                toast.success(result.data.message)
                fetchEmployees(1)
                closeModal()
            }else{
                toast.error(result.data.message);
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            setLoading(false)
            toast.err(err)
        }
    
    }

    return (
        <div className="bg-white rounded-t-3xl flex flex-col items-center w-[90%] h-[50em] lg:w-[40%] overflow-y-auto">
            <div className="flex bg-primary rounded-t-3xl w-full py-6 relative justify-center">
                <h1 className="text-white font-bold">Register Employee </h1>
                <FaTimes
                  className="text-white absolute right-4 top-6 cursor-pointer"
                  size={20}
                  onClick={closeModal}
                ></FaTimes>
            </div>
            <div className="w-[90%] xl:w-[50%] mt-12">
                <div className="mt-6">
                    <Input 
                        name={"firstName"} 
                        type={"text"}
                        placeholder={"First name"}
                        labelName={"First name"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.firstName}
                        value={employeeData.firstName}
                        error={error.firstName}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"lastName"} 
                        type={"text"}
                        placeholder={"Last name"}
                        labelName={"Last name"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.lastName}
                        value={employeeData.lastName}
                        error={error.lastName}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"nationalId"} 
                        type={"text"}
                        placeholder={"National ID"}
                        labelName={"National ID"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.nationalId}
                        value={employeeData.nationalId}
                        error={error.nationalId}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"telephone"} 
                        type={"text"}
                        placeholder={"Enter telephone number"}
                        labelName={"Telephone"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.telephone}
                        value={employeeData.telephone}
                        error={error.telephone}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"email"} 
                        type={"email"}
                        placeholder={"Enter email"}
                        labelName={"Email"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.email}
                        value={employeeData.email}
                        error={error.email}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"department"} 
                        type={"text"}
                        placeholder={"Enter department"}
                        labelName={"Department"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.department}
                        value={employeeData.department}
                        error={error.department}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"position"} 
                        type={"text"}
                        placeholder={"Enter position"}
                        labelName={"Position"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.position}
                        value={employeeData.position}
                        error={error.position}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"laptopManufacturer"} 
                        type={"text"}
                        placeholder={"Enter Laptop Manufacturer"}
                        labelName={"Laptop Manufacturer"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.laptopManufacturer}
                        value={employeeData.laptopManufacturer}
                        error={error.laptopManufacturer}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"laptopModel"} 
                        type={"text"}
                        placeholder={"Enter laptop model"}
                        labelName={"Department"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.laptopModel}
                        value={employeeData.laptopModel}
                        error={error.laptopModel}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"serialNumber"} 
                        type={"text"}
                        placeholder={"Enter Laptop Serial number"}
                        labelName={"Laptop Serial Number"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={employeeData.serialNumber}
                        value={employeeData.serialNumber}
                        error={error.serialNumber}
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

export default RegisterEmployee
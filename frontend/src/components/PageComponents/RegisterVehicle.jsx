import Input from "../Reusable/Input"
import Button from "../Reusable/Button"
import React, { useEffect, useState } from "react"
import {FaTimes} from "react-icons/fa"
import axios from "axios"
import { BASE_URL } from "../../utils/BaseUrl"
import authHeader from "../../utils/BearerAuth"
import { toast } from "react-toastify"
import Select from "../Reusable/Select"


const RegisterVehicle = ({closeModal}) => {
    const [loading, setLoading] = useState(false)
    const [vehicleData, setVehicleData] = useState({
        chasisNumber: "",
        companyName: "",
        manufactureYear: "",
        plateNumber: "",
        owner: "",
        amount: ""
    })

    const [error, setError] = useState({
        amount: "",
        manufactureYear: ""
    })

    const [owners, setOwners] = useState()
    React.useEffect(() => {
      async function fetchOwners() {
        let optionOwners = [];
        let result = await axios.get(`${BASE_URL}/owner`, {headers: authHeader()})
        for (let i = 0; i < result.data.data.length; i++) {
            let currentOwner = result.data.data[i]
            optionOwners.push({value: currentOwner._id, label: currentOwner.name})
        }
        setOwners(optionOwners)
      }
      fetchOwners()
    }, [])

    const inputHandler = (e) => {
        e.preventDefault()
        var name = e.target.name;
        var value = e.target.value;
        setVehicleData({ ...vehicleData, [name]: value })
        switch(name){
            case "amount" : 
                error.amount = isNaN(value) ? "Enter a valid amount" : ""
                break;
            case "manufactureYear" : 
                error.manufactureYear = isNaN(value) ? "Enter a valid year" : ""
                break;
            default: 
                break;
        }
        setError({...error})
    };

    const selectHandler = (e) => {
        setVehicleData({...vehicleData, owner: e.value})
    }

    const handleSubmit = async() => {
        try{
            setLoading(true)
            const result = await axios.post(`${BASE_URL}/vehicle`, vehicleData,  {headers: authHeader()})
            if(result.data.status === 200){
                toast.success(result.data.message)
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

    console.log(vehicleData)
    return (
        <div className="bg-white rounded-t-3xl flex flex-col items-center w-[90%] h-[50em] lg:w-[40%] overflow-y-auto">
            <div className="flex bg-primary rounded-t-3xl w-full py-6 relative justify-center">
                <h1 className="text-white font-bold">Register Vehicle </h1>
                <FaTimes
                  className="text-white absolute right-4 top-6 cursor-pointer"
                  size={20}
                  onClick={closeModal}
                ></FaTimes>
            </div>
            <div className="w-[90%] xl:w-[50%] mt-12">
                <div>
                    <Input 
                        name={"chasisNumber"} 
                        type={"text"}
                        placeholder={"Enter chasis number"}
                        labelName={"Chasis Number"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={vehicleData.chasisNumber}
                        value={vehicleData.chasisNumber}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"companyName"} 
                        type={"text"}
                        placeholder={"company name"}
                        labelName={"Enter company name"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={vehicleData.companyName}
                        value={vehicleData.companyName}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"manufactureYear"} 
                        type={"text"}
                        placeholder={"manufacture year"}
                        labelName={"Manufacture Year"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={vehicleData.manufactureYear}
                        value={vehicleData.manufactureYear}
                        error={error.manufactureYear}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"amount"} 
                        type={"text"}
                        placeholder={"Amount Bought"}
                        labelName={"Amount"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={vehicleData.amount}
                        value={vehicleData.amount}
                        error={error.amount}
                    />
                </div>
                <div className="mt-6">
                    <Input 
                        name={"plateNumber"} 
                        type={"text"}
                        placeholder={"Enter plate number"}
                        labelName={"Plate Number"}
                        inputHandler={inputHandler}
                        required={true}
                        defaultInputValue={vehicleData.plateNumber}
                        value={vehicleData.plateNumber}
                    />
                </div>
                <div className="mt-6">
                    <Select
                        name={"owner"}
                        options={owners}
                        labelName={"Owner"}
                        selectHandler = {selectHandler}
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

export default RegisterVehicle
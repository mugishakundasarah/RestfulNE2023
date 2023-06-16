import React, { useState } from "react";
import Input from "../components/Reusable/Input";
import Button from "../components/Reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import { validEmailRegex } from '../utils/validEmailRegex'
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/BaseUrl";

const Signup = () => {
    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        phone: "",
        nationalId: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        nationalId: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const inputHandler = (e) => {
        e.preventDefault()
        var name = e.target.name;
        var value = e.target.value;
        setRegistrationData({ ...registrationData, [name]: value })
        switch (name) {
            case "email":
              errors.email = validEmailRegex.test(value) ? '' : "Email is not valid"
                break;
            case "phone":
              errors.phone = value.length != 10 ? ' Phone number must be 10 characters long ' : '';
            break;
          case 'nationalId':
              errors.nationalId = value.length != 16 ? ' National Id should be 16 characters long ' : '';
                break;
          default:
            break;
        }
        setErrors({ ...errors })
    };

    const handleSubmit = async() => {
        try {
            setLoading(true)
            let submitData = await axios.post(`${BASE_URL}/auth/signup`, registrationData);
            if(submitData.data.status == 200){
                toast.success(submitData.data.message);
                setLoading(false)
                navigate('/')
            }else{
                toast.error(submitData.data.message);
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="w-[100%] flex justify-between">
            <div className="w-[100%] md:w-[60%] mx-auto items-center flex flex-col justify-around">
              <div className="w-[100%] xl:w-[50%] p-10 flex flex-col justify-around">    
                <img src="Logo.svg" alt="Logo" className="w-60"/>   
                <div className="mt-12">
                    <h1 className="text-3xl">Welcome back!</h1>
                    <p className=" text-md">Enter your credentials back to access your account</p>
                </div>
                <div className="w-[100%] mt-12">
                    <div>
                        <Input 
                            name={"name"} 
                            type={"text"}
                            placeholder={""}
                            labelName={"Name"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={registrationData.name}
                            disabled={loading}
                            value={registrationData.name}
                        />
                    </div>
                    <div className="mt-6">
                        <Input 
                            name={"email"} 
                            type={"email"}
                            placeholder={""}
                            labelName={"Email address"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={registrationData.email}
                            disabled={loading}
                            value={registrationData.email}
                            error={errors.email}
                        />
                    </div>
                    <div className="mt-6">
                        <Input 
                            name={"phone"} 
                            type={"text"}
                            placeholder={""}
                            labelName={"Phone Number"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={registrationData.phone}
                            disabled={loading}
                            value={registrationData.phone}
                            error={errors.phone}
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
                            defaultInputValue={registrationData.nationalId}
                            disabled={loading}
                            value={registrationData.nationalId}
                            error={errors.nationalId}
                        />
                    </div>
                    <div className="mt-6">
                        <Input 
                            name={"password"} 
                            type={"password"}
                            placeholder={""}
                            labelName={"Password"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={registrationData.password}
                            disabled={loading}
                            value={registrationData.password}
                            error={errors.password}
                        />
                    </div>

                    <div className="w-[100%] mt-4 flex justify-end">
                        <p className="text-primary">forgot password?</p>
                    </div>

                    <div className="mt-10">
                        <Button
                            className="bg-primary"
                            name={"Register"}
                            loading = {loading}
                            handleClick = {handleSubmit}
                        />
                    </div>
                </div>
                <div className="flex mt-8 mx-auto">
                    <p>Already have an account?</p>
                    <Link to={"/"} className="ml-2 text-primary">Signin</Link>
                </div>
              </div>
            </div>
            <div className="hidden xl:block  xl:w-[50%] self-end flex">
                <img src="people-3.png" alt="A people svg" className="w-[60em] h-[60em]"/>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Signup
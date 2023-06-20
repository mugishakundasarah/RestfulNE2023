import  { useState } from "react";
import Input from "../components/Reusable/Input";
import Button from "../components/Reusable/Button";
import {  useNavigate } from "react-router-dom";
import { validEmailRegex } from '../utils/validEmailRegex'
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/BaseUrl";

const Signup = () => {
    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
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
          default:
            break;
        }
        setErrors({ ...errors })
    };

    const handleSubmit = async() => {
        try {
            setLoading(true)
            let submitData = await axios.post(`${BASE_URL}/auth/signin`, registrationData);
            if(submitData.data.status == 200){
                toast.success(submitData.data.message);
                localStorage.setItem('token', submitData.data.token)
                setLoading(false)
                navigate('/dashboard')
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
        <div className="w-[100%] h-full flex bg-primary items-center">
            <div className="w-[80%] md:w-[60%] xl:w-[30%] mx-auto items-center flex flex-col justify-around bg-white h-[40rem]">
              <div className=" p-10 flex flex-col justify-around w-full">    
                <img src="rtb.svg" alt="Logo" className="w-60 mx-auto"/>  
                <div className="mt-12">
                    <div className="mt-6 ">
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
                            name={"Login"}
                            loading = {loading}
                            handleClick = {handleSubmit}
                        />
                    </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Signup
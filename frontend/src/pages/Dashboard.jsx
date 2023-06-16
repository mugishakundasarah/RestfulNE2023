import React, { useState } from "react";
import Header from "../components/Reusable/Header";
import Button from "../components/Reusable/Button";
import Input from "../components/Reusable/Input";
import Table from "../components/Reusable/Table";
import ModalContainer from "../components/Reusable/ModalContainer";
import RegisterOwner from "../components/PageComponents/RegisterOwner";
import RegisterVehicle from "../components/PageComponents/RegisterVehicle";

const defaultModalStatus = {
    shown: false,
    component: null,
};

  
const Dashboard = () => {
    const [searchText, setSearchText] = useState("") 
    const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
    const [vehicleData, setVehicleData] = useState({
        chasisNumber: 0,
        manufactureCompany: "",
        manufactureYear: "",
        plateNumber: "",
        owner: ""
    })

    const closeModal = () => {
        setmodalShown(defaultModalStatus);
    };

    const openModal = (component) => {
        if (!component) {
          return;
        }
        setmodalShown({ shown: true, component });
    };

    const registerOwner = () => {
        openModal(
            <RegisterOwner closeModal={closeModal}/>
        )
    }

    const registerVehicle = () => {
        openModal(
            <RegisterVehicle closeModal={closeModal}/>
        )
    }

    const tableHeaders = ["#", "Vehicle Name", "Owner", "Edit Vehicle", "Contact Number", "Plate Number", "Other Details"]
    return (
        <>
            <Header/>
            <div className="flex flex-wrap px-6 mt-6 justify-between items-center">
                <div className="w-full lg:w-[25em]">
                    <Input
                        placeholder={"Search Vehicle"}
                        required={true}
                        defaultInputValue={searchText}
                        value={searchText}
                        className={"text-sm"}
                    />
                </div>
                <div className="flex w-full lg:w-[25em]">
                    <Button
                        className="bg-primary mr-6 "
                        name={"Register Owner"}
                        handleClick={registerOwner}
                    />
                    <Button 
                        className="bg-primary"
                        name={"Register Vehicle"}
                        handleClick={registerVehicle}
                    />
                </div>
            </div>
            <div className="mt-4 w-[98%] mx-auto">
                <Table tableHeaders={tableHeaders}/>
            </div>
            {modalShown.shown && (
              <ModalContainer>{modalShown.component}</ModalContainer>
            )}
        </>
    )
}

export default Dashboard
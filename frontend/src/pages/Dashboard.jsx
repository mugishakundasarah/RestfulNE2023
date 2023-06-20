import React, { useEffect, useState } from "react";
import Header from "../components/Reusable/Header";
import Button from "../components/Reusable/Button";
import Input from "../components/Reusable/Input";
import Table from "../components/Reusable/Table";
import ModalContainer from "../components/Reusable/ModalContainer";
import RegisterEmployee from "../components/PageComponents/RegisterEmployee";
import axios from "axios";
import authHeader from "../utils/BearerAuth";
import { BASE_URL } from "../utils/BaseUrl";

const defaultModalStatus = {
    shown: false,
    component: null,
};

  
const Dashboard = () => {
    const [searchText, setSearchText] = useState("") 
    const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
    const [employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages ] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const closeModal = () => {
        setmodalShown(defaultModalStatus);
    };

    const openModal = (component) => {
        if (!component) {
          return;
        }
        setmodalShown({ shown: true, component });
    };

    const registerEmployee = () => {
        openModal(
            <RegisterEmployee closeModal={closeModal} fetchEmployees={fetchEmployees}/>
        )
    }


    const fetchEmployees = async (page, pageSize = 10) => {
      try {
        const response = await axios.get(`${BASE_URL}/employees?page=${page}&pageSize=${pageSize}`, {headers: authHeader()});
        setEmployees(response.data.employees);
        setTotalPages(response.data.totalPages) 
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    useEffect(() => {
          fetchEmployees(1)
    },[])

    const tableHeaders = ["First Name", "Last Name", "National Id", "Telephone", "Email", "Department", "Position", "Laptop Manufacturer", "Laptop Model", "Serial Number"]
    console.log(totalPages)
    return (
        <>
            <Header/>
            <div className="flex flex-wrap px-6 mt-6 justify-between items-center">
                <div className="w-full lg:w-[25em]">
                    <Input
                        placeholder={"Search Employee"}
                        required={true}
                        defaultInputValue={searchText}
                        value={searchText}
                        className={"text-sm"}
                    />
                </div>
                <div>
                    <Button 
                        className="bg-primary"
                        name={"Register Employee"}
                        handleClick={registerEmployee}
                    />
                </div>
            </div>
            <div className="mt-4 w-[98%] mx-auto overflow-x-auto">
                <Table tableHeaders={tableHeaders} tableData = {employees} fetchEmployees={fetchEmployees} totalPages={totalPages}/>
            </div>
            {modalShown.shown && (
              <ModalContainer>{modalShown.component}</ModalContainer>
            )}
        </>
    )
}

export default Dashboard
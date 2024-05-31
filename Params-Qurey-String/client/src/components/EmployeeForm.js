import React, { useEffect, useRef, useState } from 'react'

function EmployeeForm() {

    let [countriesList,setContriesList] = useState([]);
    let [departmentsList,setDepartmentList] = useState([]);
    let [gendersList,setGendersList] = useState([]);
    let [employees,setEmployees] = useState([]);

    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();

    useEffect(()=>{
        getCountriesListServer();
        getDepartmentsListServer();
        getGendersListServer();
    },[]);

     
    let getCountriesListServer = async ()=>{

        let reqOPtions ={
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:4567/countriesList",reqOPtions);
        let JSOData = await JSONData.json();
        setContriesList(JSOData);
        console.log(JSOData);
    };

    let getDepartmentsListServer = async ()=>{

        let reqOPtions ={
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:4567/departmentsList",reqOPtions);
        let JSOData = await JSONData.json();
        setDepartmentList(JSOData);
        console.log(JSOData);
    };

    
    
    let getGendersListServer = async ()=>{

        let reqOPtions ={
            method:"GET"
        };
        
    

        let JSONData = await fetch("http://localhost:4567/gendersList",reqOPtions);
        let JSOData = await JSONData.json();
        setGendersList(JSOData);
        console.log(JSOData);
    };

    let getEmployeesFormServer = async ()=>{

        let reqOptions = {
            method:"GET"
        };
        let url = `http://localhost:4567/employees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;
          console.log(url);
        let JSONData = await fetch(url,reqOptions);

        let JSOData = await JSONData.json();
        setEmployees(JSOData);
        console.log(JSOData);
    };
  return (
    <div>
    <form>
        <div>
            <label>Country</label>
            <select ref={countrySelectRef}>
                {countriesList.map((ele,i)=>{
                    return <option>{ele}</option>;
                })}
        
            </select>
        </div>
        <div>
            <label>Department</label>
            <select ref={departmentSelectRef}>
            {departmentsList.map((ele,i)=>{
                    return <option>{ele}</option>;
                })}
            </select>
        </div>
        <div>
            <label>Gander</label>
            <select ref={genderSelectRef}>
            {gendersList.map((ele,i)=>{
                    return <option>{ele}</option>;
                })}
            </select>
        </div>
        <div>
            <button rype="button" 
            onClick={()=>{
                getEmployeesFormServer();
            }}>Get Employees</button>
        </div>
    </form>
    <table>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>id</th>
                <th>Profile Pic</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Department</th>
                <th>Country</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            {employees.map((ele,i)=>{
                return (
                <tr key={i}>
                <td>{i+1}</td>
                <td>{ele.id}</td>
                <td><img src={ele.profilepic}></img></td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.email}</td>
                <td>{ele.gender}</td>
                <td>{ele.age}</td>
                <td>{ele.department}</td>
                <td>{ele.country}</td>
                <td>₹.{ele.salary}</td>
            </tr>
                );
            })}
            </tbody>
            
    </table>
    </div>
  )
}

export default EmployeeForm;
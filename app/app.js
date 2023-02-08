import{getEmployees,getEmpByName,deleteEmp,save, addEmployee, editEmployee} from "./repository.js"


import express, {json, request, response} from "express";

import cors from "cors";



const app=express();

app.use(express.json());

app.use(cors());





app.get('/all-employees',async (request,response)=>{

    console.log("start populare")
    const employees = await getEmployees();
    response.json(employees)


})


app.get('/emp-by-name/name=:name',async(request,response)=>{

    let name =request.params.name;
    let emp = await getEmpByName(name);
    response.json(emp)

})


app.post('/new-employee',async (request,response)=>{

    let employee = {
        full_name: request.body.full_name,
        email: request.body.email,
        birth_date: request.body.birth_date,
        employee_years: request.body.employee_years            
    }


    await addEmployee(employee);

    response.json(JSON.stringify(employee))


})


app.delete('/all-employees/delete/id=:id',async (request,response)=>{


    let id = request.params.id

    await deleteEmp(id)
    response.json("employee deleted")


})

app.put('/edit-employee/emp-id=:id',async (request,response)=>{

    let id = request.params.id;

    let employee = {

        full_name:request.body.full_name,
        email:request.body.email, 
        birth_date:request.body.birth_date,
        employee_years:request.body.employee_years
    }


    await editEmployee(employee,id);
    return response.json("edited successfully")


})




app.listen(3300,()=>{

    console.log("Listen")

})
import { getEmployees, getEmpByName, deleteEmp, save, addEmployee, editEmployee } from "./repository.js"


import express, { json, request, response } from "express";

import cors from "cors";



const app = express();

app.use(express.json());

app.use(cors());



function asyncHandler(callback) {

    return async(request,response,next)=>{

        try {
            await callback(request,response,next);
        } catch (error) {
            next(error);
        }
    }



}




app.use((req, res, next) => {

    console.log("1st logger");

    next();

})


app.get('/all-employees', asyncHandler(async (request, response) => {

    console.log("start populare")
    const employees = await getEmployees();
    response.status(200).json(employees)


}))


app.get('/emp-by-name/name=:name', asyncHandler(async (request, response) => {

        let name = request.params.name;
        let emp = await getEmpByName(name);
        response.status(200).json(emp)


}))


app.post('/add', async (request, response) => {

    let employee = {
        full_name: request.body.full_name,
        email: request.body.email,
        birth_date: request.body.birth_date,
        employee_years: request.body.employee_years,
        service: request.body.service,
        other_projects: request.body.other_projects,
        position: request.body.position
    }


    await addEmployee(employee);

    response.json(employee)


})


app.delete('/all-employees/delete/id=:id', async (request, response, next) => {


    let id = request.params.id


    try {
        await deleteEmp(id)
        response.json("employee deleted")


    } catch (error) {
        next(error)
    }




})

app.put('/edit-employee/emp-id=:id', async (request, response, next) => {

    let id = request.params.id;

    try {
        let employee = {

            full_name: request.body.full_name,
            email: request.body.email,
            birth_date: request.body.birth_date,
            employee_years: request.body.employee_years,
            service: request.body.service,
            other_projects: request.body.other_projects,
            position: request.body.position
        }


        await editEmployee(employee, id);
        return response.json("edited successfully")
    } catch (error) {
        next(error)
    }


})



// catch error
app.use((req, res, next) => {


    const error = new Error("Not found")

    error.status = 404;

    next(error)
})

// define error
app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })


})



app.listen(3300, () => {

    console.log("Listen")

})
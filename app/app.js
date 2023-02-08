import{getEmployees,getEmpByName,deleteEmp,save} from "./repository.js"


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



app.delete('/all-employees/delete/id=:id',async (request,response)=>{


    let id = request.params.id

    await deleteEmp(id)
    response.json("employee deleted")


})




app.listen(3300,()=>{

    console.log("Listen")

})
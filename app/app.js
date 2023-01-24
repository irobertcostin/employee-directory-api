import express, {json} from "express";

import cors from "cors";

import{getEmployees,getEmpByName} from "./repository.js"

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

app.listen(3300,()=>{

    console.log("Listen")

})
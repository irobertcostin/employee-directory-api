import { throws } from "assert";
import { errorMonitor } from "events";

import fs from "fs";

import path from "path";

export function getEmployees() {

    return new Promise((response,reject)=>{

        fs.readFile(("data.json"),'utf-8',(err,data)=>{

            if(err){
                reject(err);
            }else {
                const json=JSON.parse(data);
                response(json);
            }



        })
    })
}


export async function getEmpById(id){

    let data = await getEmployees();
    data = data.employees;

    let byId = data.filter(e=>e.id==id);
    
    if(byId.length==0){

        throw new Error (`No employee with ID ${id} has been found`)
    } else {
        return byId[0];
    }

}


export async function getEmpByName(name){

let data= await getEmployees();
data = data.employees;

let byName = data.filter(e=>e.full_name==name)
// console.log(byName.length)


if(byName.length==0){


    throw new Error("No employee by this name")
} else {

    for(let i=0;i<data.length;i++){

        if(data[i].full_name===(name)){
            // console.log(data[i].full_name)
            // console.log(name)
            return data[i];
        }
    
    }

}



}


export function save(data){


    return new Promise((resolve,reject)=>{

        fs.writeFile("data.json",JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}

export async function deleteEmp(id){

let data = await getEmployees();

let zeEmp = data.employees.filter(e=>e.id==id);

if(zeEmp.length==0){

    // invalid id is a message . and responds to error.message
    throw new Error(`${id} is no valid employee ID`)

}else {

    data.employees = data.employees.filter(e => e.id != id)

    await save(data)

}




}


//  must be modified to not accept employee with same attributes
export async function addEmployee(employee){

    let data = await getEmployees();

    // map every element from arr
    let ids=[];
    
    for(let i=0; i<data.employees.length;i++) {

        ids.push(data.employees[i].id)


    }


    // define a random number generator
    let id = Math.floor(Math.random()*500+1)


    // while the new id is included in ids(already existing), generate new id
    while(ids.includes(id)===true){

        id = Math.floor(Math.random()*500+1)

    }

    // once generated and no longer included, assign it to employee
    employee.id=id;

    data.employees.push(employee)
    await save(data);

}

export async function editEmployee(employee,id){

    let data = await getEmployees();

    let zeEmp = data.employees.filter(e=>e.id==id)

    if(zeEmp.length==0){

        throw new Error (`${id} is no valid employee ID`)


    }else {

        data.employees.forEach(element => {

            if(element.id==id){
    
                if(element.full_name){
                    element.full_name=employee.full_name
                }
    
                if(element.email){
                    element.email=employee.email;
                }
    
                if(element.birth_date){
                    element.birth_date=employee.birth_date;
                }
    
                if(element.employee_years){
                    element.employee_years=employee.employee_years;
                }

                
            }
            
        });
    
    
        await save(data);

    }



}

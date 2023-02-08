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


export async function getEmpByName(name){

let data= await getEmployees();
data = data.employees;

for(let i=0;i<data.length;i++){

    if(data[i].full_name===(name)){
        // console.log(data[i].full_name)
        // console.log(name)
        return data[i];
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

data.employees = data.employees.filter(e => e.id != id)

await save(data)

}


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

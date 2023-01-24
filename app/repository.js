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

export async function deleteEmp(id){

let data = getEmployees();

data.employees=data.employees.filter(e=>e.id!=id)




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
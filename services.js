require('dotenv').config();
const baseURL = process.env.BASE_URL || '/api/v0';
//collection of services.
let services ={
    "customers":{
        "get":{
            "all":{
                "url":`${baseURL}/customers/all`,
                "query":"SELECT * FROM customersTbl",
                "params":[]
            },
            "active":{
                "url":`${baseURL}/customers`,
                "query":"SELECT * FROM customersTbl WHERE active = 1",
                "params":[]
            },
            "byId":{
                "url":`${baseURL}/customers/:id`,
                "query":"SELECT * FROM customersTbl where id = ?",
                "params":['id']
            }
        },
        "post":{
            "url":`${baseURL}/customers`,
            "query":"INSERT INTO customersTbl SET ?",
            "params":[]
        },
        "put":{
            "url":`${baseURL}/customers/:id`,
            "query":"UPDATE customersTbl SET ? WHERE id = ?",
            "params":[]
        },
        "delete":{
            "url":`${baseURL}/customers/:id`,
            "query":"DELETE FROM customersTbl WHERE id = ?",
            "params":["id"]
        }
    }
};

module.exports = services;
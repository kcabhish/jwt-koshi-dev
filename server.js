const express = require('express');
const connection = require("./connection");
const app = express();
const services = require('./services');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());

if (!!connection) {
    app.use(connection);

    let x = require('crypto').randomBytes(64).toString('hex');
    // Gets the port value from the .env file, otherwise uses the default value of 3000
    const PORT = process.env.PORT || 3000;
    if (!!services) {
        //Generating API from service collection
        for(var key in services) {
            if (services[key].hasOwnProperty('post')){
                createPostServices(services[key].post.url,services[key].post.query,services[key].post.params);   
            }
            
            //Creating rest services for different properties in the GET object
            if (services[key].hasOwnProperty('get')){
                for (var service in services[key]["get"]){
                    createGetServices(services[key]['get'][service].url,services[key]['get'][service].query,services[key]['get'][service].params); 
                } 
            }
            if (services[key].hasOwnProperty('put')){
                createPutServices(services[key].put.url,services[key].put.query,services[key].put.params);
            }
            if (services[key].hasOwnProperty('delete')){
                createDeleteServices(services[key].delete.url,services[key].delete.query,services[key].delete.params);
            }
            
        } 
    } else {
        console.log("No services were created");
    }

    app.listen(PORT, () => {
        console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
    })
} else {
    console.log("COULD NOT CONNECT TO DATABASE");
}

/**
 * Function to generate the GET services
 * @param {*} url 
 * @param {*} query 
 * @param {*} params 
 */
function createGetServices(url,query,params) {
    console.log(`Creating GET services for... ${url}`);
    app.get(url,function(req,res,next){
        //Array to store dynamic parameters
        let ids = [];
        for (let i=0;i<params.length;i++){
            ids.push(req.params[params[i]]);
        }
        req.getConnection(function(err, connection) {
          if (err) return next(err);

          connection.query(query,ids, function(err, results) {
            if (err){
              console.log(err);
              return next("Mysql error, check your query");  
            }         
            res.json(results);
          });      
        });   
    });
}

/**
 * Function to genreate the post service
 * @param {*} url 
 * @param {*} query 
 * @param {*} params 
 */
function createPostServices(url,query,params){
    console.log("Creating POST services for... " + url);
    app.post(url,function(req,res,next){
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            var queryx =connection.query(query,reqObj,function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

/**
 * Function to generate the put services
 * @param {*} url 
 * @param {*} query 
 * @param {*} params 
 */
function createPutServices(url,query,params){
    console.log("Creating PUT services for... "+url);
    app.put(url,function(req,res,next){
        var id=req.params.id;
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            var queryx =connection.query(query,[reqObj,id],function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

/**
 * Create DELETE services
 * @param {*} url 
 * @param {*} query 
 * @param {*} params 
 */
function createDeleteServices(url,query,params){
    console.log(`Creating DELETE services for ...${url}`);
    app.delete(url,function(req,res,next){
        //Array to store dynamic parameters
        let ids = [];
        for (let i=0;i<params.length;i++){
            ids.push(req.params[params[i]]);
        }
        req.getConnection(function(err, connection){
            if (err){
                return next(err);
            }
            connection.query(query, ids, function(err, results){
                if (err){
                    console.log(err);
                }
                res.json(results);
            })
        })
        
    })
}

const express = require('express');
const app = express();

const employeeRoute = express.Router();

let employeeModel = require('../Model/Employee');

employeeRoute.route('/').get(function(req,res){
    employeeModel.find(function(err,employee){
        if(err){
            console.log(err)
        }
        else{
            res.json(employee)
        }
    });
});

employeeRoute.route('/addEmployee').post(function(req,res){
    let employee = new employeeModel(req.body);
    employee.save()
    .then(game=>{
        res.status(200).json({'employee':'added successfully'});
    })
    .catch(err=>{
        res.status(400).send('something went wrong');
    });
});


employeeRoute.route('/getById/:id').get(function(req,res){
    let id = req.params.id;
    employeeModel.findById(id,function(err,employee){
        res.json(employee);
    });
});

employeeRoute.route('/updateEmployee/:id').put(function(req,res){
    employeeModel.findById(req.params.id, function(err,employee){
        if(!employee){
            return next(new Error('Unable To Find Employee With This Id'));
        }
        else{
            employee.firstName = req.body.firstName;
           employee.lastName = req.body.lastName;
           employee.email = req.body.email;
           employee.phone = req.body.phone; 

           employee.save().then(emp=>{
               res.json('updated');
           })
           .catch(err=>{
               res.status(400).send('not updated');
           });
        }
    });
});


employeeRoute.route('/delete/:id').delete(function(req,res){
    employeeModel.findByIdAndDelete({_id: req.params.id}, function(err,employee){
        if(err)
            res.json(err);

            else
            res.json('deleted')
        
    })
})

module.exports = employeeRoute;
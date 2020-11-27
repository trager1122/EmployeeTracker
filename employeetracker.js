const mysql=require ('mysql');
const inquirer=require ('inquirer');
const cTable=require ('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'H@dlee!',
    database: 'employee_DB',
});

const department=require ('department.js');
const role=require ('role.js');
const employee=require('employee.js');

connection.connect((err) => {
    if (err) throw err;
    dbSearch();
});

const dbSearch=()=>{
    console.log('Welcome to your Employee Tracker System!');
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add department, role, or employee',
                'View employees by department, role, by manager or all employees',
                'Update the role or manager of an employee',
                'Delete a department, employee role, or employee',
                'View the budget of an individual department',
                'Exit'
            ]
        })
        .then((select)=>{
            switch(select.action){
                case 'Add department, role, or employee':
                    add();
                    break;

                case 'View employees by department, role, by manager or all employees':
                    view();
                    break;

                case 'Update the role or manager of an employee':
                    update();
                    break;

                case 'Delete a department, employee role, or employee':
                    remove();
                    break;

                case 'View the budget of an individual department':
                    budget();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        })
} 

//Function to add a department, employee role, or employee
const add=()=>{
    inquirer
        .prompt({
            name: 'add',
            type: 'list',
            message: 'What would you like to add?',
            choices: [
                'Department',
                'Employee Role',
                'Employee',
                'Go Back'
            ]
        })
        .then((select)=>{
            switch(select.add){
                case 'Department':
                    break;
                case 'Employee Role':
                    break;
                case 'Employee':
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
        })
}

//Function to view employees by department, role, their manager, and all of them
const view=()=>{
    inquirer
        .prompt({
            name: 'view',
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                'Employee by Department',
                'Employee by Role',
                'Employee by Manager',
                'View all Employees',
                'Go Back'
            ]
        })
        .then((select)=>{
            switch(select.view){
                case 'Employee by Department':
                    break;
                case 'Employee by  Role':
                    break;
                case 'Employee by Manager':
                    break;
                case 'View all Employees':
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
        })

}

//Function to update the role or manager of an employee
const update=()=>{
    inquirer
        .prompt({
            name: 'update',
            type: 'list',
            message: 'What would you like to update?',
            choices: [
                'Department',
                'Employee Role',
                'Employee',
                'Go Back'
            ]
        })
        .then((select)=>{
            switch(select.update){
                case 'Department':
                    break;
                case 'Employee Role':
                    break;
                case 'Employee':
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
        })

}

//Function to delete a department, role, or employee
const remove=()=>{
    inquirer
        .prompt({
            name: 'remove',
            type: 'list',
            message: 'What would you like to delete?',
            choices: [
                'Department',
                'Employee Role',
                'Employee',
                'Go Back'
            ]
        })
        .then((select)=>{
            switch(select.remove){
                case 'Department':
                    break;
                case 'Employee Role':
                    break;
                case 'Employee':
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
        })
}

//Function to display the individual budget of each department
const budget=()=>{
    inquirer
        .prompt({
            name: 'budget',
            type: 'list',
            message: 'Select the department whose budget you would like to see',
            choices: [
            ]
        })
        .then((select)=>{
            
        })

}
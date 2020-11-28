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

const department=require ('./lib/department');
const role=require ('./lib/role');
const employee=require('./lib/employee');

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
                'View departments, roles, or employees',
                'Update an employee role',
                'Exit'
            ]
        })
        .then((select)=>{
            switch(select.action){
                case 'Add department, role, or employee':
                    add();
                    break;

                case 'View departments, roles, or employees':
                    view();
                    break;

                case 'Update an employee role':
                    update();
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
                    connection.query(department.add(),(err,res)=>{
                        if (err) throw err;
                        else console.log('Department successfully added!');
                   })
                    break;
                case 'Employee Role':
                    connection.query(role.add(),(err,res)=>{
                        if (err) throw err;
                        else console.log('Employee Role successfully added!');
                   })
                    break;
                case 'Employee':
                    connection.query(employee.add(),(err,res)=>{
                         if (err) throw err;
                         else console.log('Employee successfully added!');
                    })
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
            dbSearch();
        })
}

//Function to view employees by department, role, their manager, or all of them
const view=()=>{
    inquirer
        .prompt({
            name: 'view',
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                'Departments',
                'Employee Roles',
                'Employees',
                'Go Back'
            ]
        })
        .then((select)=>{
            switch(select.view){
                case 'Departments':
                    connection.query(department.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Role':
                    console.log('Current employee roles')
                    connection.query(role.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Employees':
                    connection.query(employee.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
            dbSearch();
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
                    department.update();
                    break;
                case 'Employee Role':
                    role.update();
                    break;
                case 'Employee':
                    employee.update();
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
                    department.remove();
                    break;
                case 'Employee Role':
                    role.remove();
                    break;
                case 'Employee':
                    employee.remove();
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
                //Use query to display all current departments and go back option
            ]
        })
        .then((select)=>{
                //Use query to provide budget for the department chosen
        })

}
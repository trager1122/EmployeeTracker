const mysql=require ('mysql');
const inquirer=require ('inquirer');
const cTable=require ('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'wvu1122',
    database: 'employee_db',
});

const department=require ('./lib/department');
const role=require ('./lib/role');
const employee=require('./lib/employee');
const Employee = require('./lib/employee');
const Department = require('./lib/department');
const Role = require('./lib/role');

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
                    const dept=new Department();
                    connection.query(dept.add(),(err,res)=>{
                        if (err) throw err;
                        else console.log('Department successfully added!');
                   })
                    break;
                case 'Employee Role':
                    const newJob=new Role();
                    connection.query(newJob.add(),(err,res)=>{
                        if (err) throw err;
                        else console.log('Employee Role successfully added!');
                   })
                    break;
                case 'Employee':
                    const emp_Roles=[connection.query('SELECT title from Job',(err,res)=>{
                        if (err) throw err;
                        else return res;
                    })]
                    const emp_Names=[connection.query('SELECT id,first_name+" "+ last_name from Employee',(err,res)=>{
                        if (err) throw err;
                        else return res;
                    })]
                    const newEmployee=new Employee();
                    connection.query(newEmployee.add(emp_Roles,emp_Names),(err,res)=>{
                         if (err) throw err;
                         else console.log('Employee successfully added!');
                    })
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
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
                    console.log('Current Departments');
                    const depts=new Department();
                    connection.query(depts.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Role':
                    console.log('Current employee roles');
                    const jobs=new Role();
                    connection.query(jobs.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Employees':
                    console.log('Current Employee Roster');
                    const employees=new Employee();
                    connection.query(employees.view(),(err,res)=>{
                        if (err) throw err;
                        cTable(res);
                    })
                    break;
                case 'Go Back':
                    dbSearch();
                    break;
            }
        })
}

//Function to update an employee role
const update=()=>{
    const emp_Roles=connection.query('SELECT title from Job',(err,res)=>{
        if (err) throw err;
        else{
        return (res)=>[...res,'Go Back'];
        };
    });
    inquirer
        .prompt({
            name: 'update',
            type: 'list',
            message: 'What employee role would you like to update?',
            choices: [...emp_Roles]
        })
        .then((select)=>{
            if (select.update==='Go Back'){
                dbSearch();
            }
            else{
                connection.query('SELECT title,salary,department_id FROM Job WHERE title=?',{title:select.update},(err,res)=>{
                    if (err) throw err;
                    console.log('Current Role Information');
                    cTable(res);
                })
                inquirer
                    .prompt([
                        {
                        name: 'jobTitle',
                        type: 'input',
                        message: 'Enter current job title or the new job title you would like to give this role'
                        },
                        {  
                        name: 'jobSalary',
                        type: 'input',
                        message: 'Enter the current salary of this role or the new salary for this role'
                        },
                        {
                        name: 'jobDeptID',
                        type: 'input',
                        message: 'Enter the current department ID for this role or the new department ID for this role'
                        }
                    ])
                    .then((data)=>{
                        const updateQuery='UPDATE Job SET title='+data.jobTitle+
                                        ' SET salary='+data.jobSalary+
                                        ' SET department_id='+data.jobDeptID+
                                        ' WHERE title='+select.update;
                        connection.query(updateQuery,(err,current)=>{
                        if (err) throw err;
                        console.log('Role updated successfullly!');
                        cTable(current);
                        })
                    })
            } 
        })
};

// //Function to delete a department, role, or employee
// const remove=()=>{
//     inquirer
//         .prompt({
//             name: 'remove',
//             type: 'list',
//             message: 'What would you like to delete?',
//             choices: [
//                 'Department',
//                 'Employee Role',
//                 'Employee',
//                 'Go Back'
//             ]
//         })
//         .then((select)=>{
//             switch(select.remove){
//                 case 'Department':
//                     department.remove();
//                     break;
//                 case 'Employee Role':
//                     role.remove();
//                     break;
//                 case 'Employee':
//                     employee.remove();
//                     break;
//                 case 'Go Back':
//                     dbSearch();
//                     break;
//             }
//         })
// }

// //Function to display the individual budget of each department
// const budget=()=>{
//     inquirer
//         .prompt({
//             name: 'budget',
//             type: 'list',
//             message: 'Select the department whose budget you would like to see',
//             choices: [
//                 //Use query to display all current departments and go back option
//             ]
//         })
//         .then((select)=>{
//                 //Use query to provide budget for the department chosen
//         })

// }
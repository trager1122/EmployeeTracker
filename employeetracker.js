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

const Department=require ('./lib/department');
const Role=require ('./lib/role');
const Employee=require('./lib/employee');

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
                    dept.add(connection,dbSearch);
                    break;
                case 'Employee Role':
                    const newJob=new Role();
                    newJob.add(connection,dbSearch);
                    break;
                case 'Employee':
                    const newEmployee=new Employee();
                    newEmployee.add(connection,dbSearch);
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
                        console.table(res);
                        dbSearch();
                    })
                    break;
                case 'Employee Roles':
                    console.log('Current employee roles');
                    const jobs=new Role();
                    connection.query(jobs.view(),(err,res)=>{
                        if (err) throw err;
                        console.table(res);
                        dbSearch();
                    })
                    break;
                case 'Employees':
                    console.log('Current Employee Roster');
                    const employees=new Employee();
                    connection.query(employees.view(),(err,res)=>{
                        if (err) throw err;
                        console.table(res);
                        dbSearch();
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
    var empRoles=[];
    connection.query('SELECT title from Job',(err,res)=>{
        if (err) throw err;
        else{
            for(var i=0; i<res.length; i++){
                empRoles.push(res[i].title);
            }
            inquirer
                .prompt({
                    name: 'update',
                    type: 'list',
                    message: 'What employee role would you like to update?',
                    choices: [...empRoles,'Go Back']
                })
                .then((select)=>{
                    if (select.update==='Go Back'){
                        dbSearch();
                    }
                    else{
                        connection.query('SELECT title,salary FROM Job WHERE ?',[{title:select.update}],(err,res)=>{
                            if (err) throw err;
                            else {
                                console.log('Current Role Information');
                                console.table(res);
                                inquirer
                                    .prompt([
                                        {
                                        name: 'jobTitle',
                                        type: 'input',
                                        message: 'Enter current job title or the new job title you would like to give this role'
                                        },
                                        {  
                                        name: 'jobSalary',
                                        type: 'number',
                                        message: 'Enter the current salary of this role or the new salary for this role'
                                        }
                                    ])
                                    .then((data)=>{
                                        const updateQuery='UPDATE Job SET title="'+data.jobTitle+'",'+
                                                        'salary='+data.jobSalary+
                                                        ' WHERE title="'+select.update+'"';
                                        connection.query(updateQuery,(err,current)=>{
                                            if (err) throw err;
                                            else{
                                                console.log('Role updated successfullly!');
                                                dbSearch();
                                            }
                                        })
                                    })
                            }
                        })
                    }
                })    
        }        
    })
}

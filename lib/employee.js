const inquirer=require ('inquirer');

class Employee{
    constructor(empRoles,empNames){
        this.empRoles=empRoles;
        this.empNames=empNames;
    }

    add(connection,dbSearch,empRoles,empNames){
        inquirer
            .prompt([{
                name: 'nameFirst',
                type: 'input',
                message: 'What is the first name of the employee?'},
                {
                name: 'nameLast',
                type: 'input',
                message: 'What is the last name of the employee?'
                },
                {
                name: 'empRole',
                type: 'list',
                message: 'Please choose the role the employee will perform.',
                choices: [...empRoles]   
                },
                {
                name: 'manager',
                type: 'list',
                message: 'Please choose the manager of the employee if they have one',
                choices: [...empNames,'No Manager']    
            }])
            .then((data)=>{
                var jobID=parseInt(data.empRole[1]);
                var mgr;
                if (data.manager==='No Manager'){
                    mgr=null;
                }
                else{mgr=parseInt(data.manager[1])};
                connection.query('INSERT INTO Employee SET ?',{
                                                            first_name:data.nameFirst,
                                                            last_name:data.nameLast,
                                                            role_id:jobID,
                                                            manager_id:mgr
                                                            },
                    ()=>{
                        console.log('Employee succesfully added!');
                        dbSearch();
                })
                
            })
    }

    view(){
        return 'SELECT Employee.id,first_name,last_name,title,salary,name FROM Department RIGHT JOIN Job ON Department.id=Job.department_id RIGHT JOIN Employee on Job.id=Employee.role_id'
    }


}

module.exports=Employee;
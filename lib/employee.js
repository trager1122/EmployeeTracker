const inquirer=require ('inquirer');

class Employee{

    add(empRoles,empNames){
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
                name: 'emp_role',
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
                if (data.manager==='No Manager'){
                    data.manager=null;
                }
                var mgr=data.manager;
                var mgrSplit=mgr.split(" ");
                var mgrID=parseInt(mgrSplit[0]);
                return 'INSERT INTO Employee (first_name,last_name,role_id,manager_id) VALUES('+data.nameFirst+','+data.nameLast+','+data.roleID+','+mgrID+')';
            })
    }

    view(){
        return 'SELECT Employee.id,first_name,last_name,title,salary,name FROM Department RIGHT JOIN Job ON Department.id=Job.department_id RIGHT JOIN Employee on Job.id=Employee.role_id'
    }


}

module.exports=Employee;
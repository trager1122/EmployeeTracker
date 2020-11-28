const inquirer=require ('inquirer');

class Employee{

    add(emp_Roles,emp_Names){
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
                choices: emp_Roles   
                },
                {
                name: 'manager',
                type: 'list',
                message: 'Please choose the manager of the employee if they have one',
                choices: emp_Names    
            }])
            .then((data)=>{
                const mgr=data.manager;
                const mgrSplit=mgr.split(" ");
                const mgrID=mgrSplit[0];
                return 'INSERT INTO Employee (first_name,last_name,role_id,manager_id) VALUES(',data.nameFirst,data.nameLast,data.roleID,mgrID,')';
            })
    }

    view(){
        return 'SELECT id,first_name,last_name,title,salary,name FROM Department JOIN Role on Department.id=Role.department_id JOIN Employee on Role.id=Employee.role_id'
    }


}
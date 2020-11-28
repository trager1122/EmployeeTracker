const inquirer=require ('inquirer');

class Employee{

add(){
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
            name: 'roleID',
            type: 'input',
            message: 'Please enter code that corresponds with the role the employee will perform.'    
            },
            {
            name: 'manager',
            type: 'input',
            message: 'If employee has a manager, please enter the employee ID of the manager. Otherwise, press ENTER.'    
        }])
        .then((data)=>{
            return 'INSERT INTO Employee (first_name,last_name,role_id,manager_id) VALUES(',data.nameFirst,data.nameLast,data.roleID,data.manager,')';
        })
    }          
}
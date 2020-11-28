const inquirer=require('inquirer');

class Role{
    add(){
        inquirer
            .prompt([
                {
                name: 'title',
                type: 'input',
                message: 'What is the title of the employee role you wish to create?'},
                {
                name: 'salary',
                type: 'input',
                message: 'What will the salary for this role be?'
                },
                {
                name: 'deptID',
                type: 'input',
                message: 'Please enter the department code for which this role will operate.'    
                }    
            ])
            .then(data){
                return 'INSERT INTO Role (title,salary,department_id) VALUES(',data.title,data.salary,data.deptID,')';
            }
}
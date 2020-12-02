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
                message: 'Please enter the department code for which this role will be performed.'    
                }    
            ])
            .then((data)=>{
                return 'INSERT INTO Job (title,salary,department_id) VALUES('+data.title+','+data.salary+','+parseInt(data.deptID),')';
            })
    }

    view(){
        return 'SELECT Job.id,title,salary,name FROM Department RIGHT JOIN Job ON Department.id=Job.department_id';
    }
};

module.exports=Role;
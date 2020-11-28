const inquirer=require('inquirer');

class Department{
    add(){
        inquirer
            .prompt({
                name: 'name',
                type: 'input',
                message: 'What is the name of the department you would like to add?'
                })
            .then((data)=>{
                return 'INSERT INTO Department (name) VALUES(',data.name,')'
            })
    }

    view(){
        return 'SELECT id, name FROM Department';
    }
}
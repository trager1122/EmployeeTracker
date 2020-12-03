const inquirer=require('inquirer');

class Department{
    //Method for adding a department
    add(connection, dbSearch){
        inquirer
            .prompt({
                name: 'name',
                type: 'input',
                message: 'What is the name of the department you would like to add?'
                })
            .then((data)=>{
                connection.query(
                    'INSERT INTO Department SET ?',
                    {
                      name: data.name
                    }
                )
                console.log("New department successfully added!");
                dbSearch();
            })
    }
    //Method for viewing all current departments within company
    view(){
        return 'SELECT id,name FROM Department';
    }
}
module.exports=Department;
const inquirer=require('inquirer');

class Department{
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
    view(){
        return 'SELECT id,name FROM Department';
    }
}
module.exports=Department;
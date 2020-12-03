const inquirer=require('inquirer');

class Role{
    //Method for adding a new employee role within the company
    add(connection,dbSearch){
        var depts=[];
        connection.query('SELECT id,name FROM Department', (err,res)=>{
            if (err) throw err;
            else{
                for(var i=0; i<res.length; i++){
                    depts.push((res[i].id.toString())+' '+res[i].name);
                }
            }
         })
        inquirer
            .prompt([
                {
                name: 'title',
                type: 'input',
                message: 'What is the title of the employee role you wish to create?'
                },
                {
                name: 'salary',
                type: 'number',
                message: 'What will the salary for this role be?'
                },
                {
                name: 'deptID',
                type: 'list',
                message:'Please enter the department for which this role will be performed.', 
                choices:depts
                }    
            ])
            .then((data)=>{
                connection.query('INSERT INTO Job SET ?',
                                {
                                title:data.title,
                                salary:data.salary,
                                department_id:parseInt(data.deptID[0])
                                },(err)=>{
                                        if (err) throw err;
                                        else{
                                            console.log('New employee role successfully added!');
                                            dbSearch();
                                        }
                })                        
            })
        
    }
    //Method for viewing all employee roles within the company
    view(){
           return 'SELECT Job.id,title,salary,name FROM Department RIGHT JOIN Job ON Department.id=Job.department_id'
    }
}

module.exports=Role;
const inquirer=require('inquirer');

class Role{
    add(connection,dbSearch){
        var depts=[];
        connection.query('SELECT id,name FROM Department',(err,res)=>{
            for(var i=0; i<res.length; i++){
                  depts.push((res[i].id[1].toString())+' '+res[i].name);
              }
         console.log(depts);
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
                type: 'input',
                message: 'What will the salary for this role be?'
                },
                {
                name: 'deptID',
                type: 'list',
                message:'Please enter the department code for which this role will be performed.', 
                choices:depts
                }    
            ])
            .then((data)=>{
                connection.query('INSERT INTO Job SET ?',
                                {
                                title:data.title,
                                salary:data.salary,
                                dept_id:parseInt(data.deptID[1])
                                },()=>{
                                        console.log('New employee role successfully added!');
                                        dbSearch();
                })                        
            })
        
    }

    view(){
           return 'SELECT Job.id,title,salary,name FROM Department RIGHT JOIN Job ON Department.id=Job.department_id'
    }
}

module.exports=Role;
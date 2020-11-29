USE employee_db;

INSERT INTO Employee(first_name,last_name) VALUES ('John','Doe');
INSERT INTO Employee(first_name,last_name) VALUES ('Mike','Chan');
INSERT INTO Employee(first_name,last_name) VALUES ('Ashley','Rodriguez');
INSERT INTO Employee(first_name,last_name) VALUES ('Kevin','Tupik');
INSERT INTO Employee(first_name,last_name) VALUES ('Malia','Brown');
INSERT INTO Employee(first_name,last_name) VALUES ('Sarah','Lourd');
INSERT INTO Employee(first_name,last_name) VALUES ('Tom','Allen');
INSERT INTO Employee(first_name,last_name) VALUES ('Christian','Eckenrode');
INSERT INTO Employee(first_name,last_name) VALUES ('Tammer','Galal');

INSERT INTO Job(title,salary) VALUES ('Sales Lead',100000);
INSERT INTO Job(title,salary) VALUES ('Salesperson',80000);
INSERT INTO Job(title,salary) VALUES ('Lead Engineer',150000);
INSERT INTO Job(title,salary) VALUES ('Software Engineer',120000);
INSERT INTO Job(title,salary) VALUES ('Accountant',125000);
INSERT INTO Job(title,salary) VALUES ('Legal Team Lead',250000);
INSERT INTO Job(title,salary) VALUES ('Lawyer',190000);

INSERT INTO Department(name) VALUES('Sales');
INSERT INTO Department(name) VALUES('Engineering');
INSERT INTO Department(name) VALUES('Finance');
INSERT INTO Department(name) VALUES('Legal');

UPDATE Employee SET role_id=1,manager_id=3 WHERE id=1;
UPDATE Employee SET role_id=2,manager_id=1) WHERE id=2;
UPDATE Employee SET role_id=3 WHERE id=3;
UPDATE Employee SET role_id=4,manager_id=3 WHERE id=4;
UPDATE Employee SET role_id=5 WHERE id=5;
UPDATE Employee SET role_id=6 WHERE id=6;
UPDATE Employee SET role_id=7,manager_id=6 WHERE id=7;
UPDATE Employee SET role_id=3,manager_id=2 WHERE id=8;
UPDATE Employee SET role_id=4,manager_id=4 WHERE id=9;

UPDATE Job SET department_id=1 WHERE id=1 OR id=2;
UPDATE Job SET department_id=2 WHERE id=3 OR id=4;
UPDATE Job SET department_id=3 WHERE id=5;
UPDATE Job SET department_id=4 WHERE id=6 OR id=7;





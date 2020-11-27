/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS employee_db;

/* Create database */
CREATE DATABASE Employee_db;
USE Employee_db;

/* Create new table with a primary key*/
CREATE TABLE Employee(
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES Role(id),
  FOREIGN KEY (manager_id) REFERENCES Employee(id)
)

CREATE TABLE Role(
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES Department(id)
)

CREATE TABLE Department(
    id INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
)
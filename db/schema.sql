/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS employee_DB;

/* Create database */
CREATE DATABASE employee_DB;
USE employee_DB;

/* Create new table with a primary key*/
CREATE TABLE Employee(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT UNSIGNED NULL,
  FOREIGN KEY (role_id) REFERENCES Role(id),
  FOREIGN KEY (manager_id) REFERENCES Employee(id)
)

CREATE TABLE Role(
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(id)
)

CREATE TABLE Department(
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    name VARCHAR(30),
)
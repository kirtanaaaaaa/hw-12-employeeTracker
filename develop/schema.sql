DROP DATABASE IF EXISTS employee_tracker;

CREATE database employee_tracker;
USE employee_tracker;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int,
  manager_id VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30), 
    salary DECIMAL(10,10),
    department_id int,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30), 
    PRIMARY KEY (id)
);


INSERT INTO employees (first_name, last_name, role_id,manager_id)
VALUES ("John","Doe", 1, "Ashley Rodriguez"),
("Mike", "Chan", 2, "John Doe"),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, "Ashley Rodriguez"),
("Malia", "Brown", 5, null),
("Sarah", "Lourd", 6, null),
("Tom", "Allen", 7, "Sarah Lourd"),
("Chrisitan", "Eckenrode", 8, "Mike Chan");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Salesperson", 80000,1),
("Lead Engineer", 150000,2),
("Software Engineer", 120000,2),
("Accountant", 125000,3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000,4),
("Lead Engineer", 150000,2);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");




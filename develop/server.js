var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
  inquirer
    .prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all Employees", 
          "View all Roles", 
          "View all Departments", 
          "Add Employee", 
          "Add Role", 
          "Add Department", 
          "Update Employee Role"]
        })
        .then(function (answer) {
            switch (answer.action) {
            case "View all Employees":
                viewAllEmployees();
                break;
        
            case "View all Roles":
                viewAllRoles();
                break;
        
            case "View all Departments":
                viewAllDepartments();
                break;
        
            case "Add Employee":
                addEmployee();
                break;
        
            case "Add Role":
                addRole();
                break;
            
            case "Add Department":
                addDepartment();
                break;
            
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            }
      })
};

function viewAllEmployees(){
  connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name, roles.salary, employees.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN department on department.id = roles.department_id", 
  function (err, res){
    if (err) throw err;
    console.table(res);
    start();
  })
};

function viewAllRoles(){
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
};

function viewAllDepartments(){
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
};

function addEmployee(){
  inquirer
      .prompt([{
        name: "first_name",
        type: "input",
        message: "What is the first name of new employee?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of new employee?",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter role id",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter Manager name",
      }]).then(function (answer) {
      connection.query("INSERT INTO employees SET ? ",
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id
      },function (err, res) {
        if (err) throw err;
        console.log("New employee added!");
        start();
      });
    });
};

function addRole(){
  inquirer
    .prompt([
      {
          name: "title",
          type: "input",
          message: "What is the title of the new role?"
      },
      {
          name: "salary",
          type: "input",
          message: "What is the salary of the new role?"
      },
      {
        name: "id",
        type: "input",
        message: "What is the department id of new role?"
      }
  ])
  .then(function (answer) {
    connection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.id
      },
        function (err) {
          if (err) throw err;
          console.log("New role added!");
          start();
        });
    })
};

function addDepartment(){
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What new department would you like to add?"
      }
    ]).then(function(answer) {
      connection.query("INSERT INTO department SET ?",
        {
          department: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("New department added!");
          start();
        })
      })
    }

function updateEmployeeRole(){
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "what is the employee id",
      },
      {
        name: "role_id",
        type: "input",
        message: "What would you like to update the roll to?"
      }
  ]).then(function (answer) {
      connection.query("UPDATE employee SET? WHERE ?",
      [
        { id: answer.id },
        { role_id: answer.role_id }
      ],
        function (err, res) {
          if (err) throw err;
          console.log("Role is updated!")
          start();
        });
    });
};
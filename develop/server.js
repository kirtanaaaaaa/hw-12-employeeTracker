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
    afterConnection();
    start();
});

function afterConnection() {
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

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
            if (answer.option === "View All Employees") {
                viewAllEmployees();
            }
            if (answer.option === "View All Roles") {
                viewAllRoles();
            }
            if (answer.option === "View All Departments") {
                viewAllDepartments();
            }
            if (answer.option === "Add Employee") {
                addEmployee();
            }
            if (answer.option === "Add Role") {
                addRole();
            }
            if (answer.option === "Add Department") {
                addDepartment();
            }
            if (answer.option === "Update Employee Role") {
                updateEmployeeRole();
            }
        })
};

function viewAllEmployees(){

};

function viewAllRoles(){

};

function viewAllDepartments(){

};

function addEmployee(){

};

function addRole(){

};

function addDepartment(){

};

function updateEmployeeRole(){

};
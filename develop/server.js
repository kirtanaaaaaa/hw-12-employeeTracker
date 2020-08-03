var inquirer = require("inquirer");
var mysql = require("mysql");

var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employee_tracker"
});

connect.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connect.threadId);
    start();
});

function start() {
    inquirer
        .prompt({
            name: "option",
            type: "list",
            message: "What would you want to do?",
            choices: [ "View All Employees by Department", "View All Employees by Role", "View All Employees by Manager", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Update Employee Manager"]
        })
        .then(function (answer) {
            if (answer.option === "View All Employees by Department") {
                viewAllbyDept();
            }
            if (answer.option === "View All Employees by Role") {
                viewAllbyRole();
            }
            if (answer.option === "View All Employees by Manager") {
                viewAllbyMgr();
            }
            if (answer.option === "Add Employee") {
                addEmployee();
            }
            if (answer.option === "Add Department") {
                addDept();
            }
            if (answer.option === "Add Role") {
                addRole();
            }
            if (answer.option === "Update Employee Role") {
                updateEmployeeRole();
            }
            if (answer.option === "Update Employee Manager") {
                updateEmployeeMgr();
            }
        })
};
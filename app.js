const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');
// const view = require("./lib/functions/view");
// const add = require("./lib/functions/add");
// const update = require("./lib/functions/update");


const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'company_DB',
});
// Connect to the DB
connection.connect(async (err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
// Start the app
const start = () => {
    inquirer
        .prompt({
            name: 'userOption',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
              new inquirer.Separator(),
              'View Employees',
              'View Departments',
              'View Roles',
              new inquirer.Separator(),
              'Add Employee',
              'Add Department',
              'Add Role',
              new inquirer.Separator(),
              'Update Employee Role',
              new inquirer.Separator(),
              'Exit System',
            ],
        })
        .then((answer) => {
            switch (answer.userOption) {
                // View
                case 'View Employees':
                    getEmployees();
                    break;
                case 'View Departments':
                    getDepartments();
                    break;
                case 'View Roles':
                    getRoles();
                    break;
                // Add
                case 'Add Employee':
                    addEmployees();
                    break;
                case 'Add Department':
                    addDepartments();
                    break;
                case 'Add Role':
                    addRoles();
                    break;
                // Update
                case 'Update Employee':
                    updateEmployees();
                    break;
                // Exit
                case 'Exit System':
                    console.log("Thanks for using the Employee Tracker. Goodbye.")
                    connection.end();
                    break;
                // Creates an error message if something breaks
                default:
                    console.log(`Uh oh, you broke me! Tell my creator how I died.`);
            }
        })
};
// Get Requests
// Shows Employees in a list
const getEmployees = () => {
    connection.query('SELECT * FROM employee', async (err, employees) => {
      if (err) throw err;
      console.table(employees);
      start();
    });
};
// Shows Employees in a list
const getDepartments = () => {
    connection.query('SELECT * FROM department', async (err, departments) => {
      if (err) throw err;
      console.table(departments);
      start();
    });
};
// Shows Employees in a list
const getRoles = () => {
    connection.query('SELECT * FROM role', async (err, roles) => {
      if (err) throw err;
      console.table(roles);
      start();
    });
};

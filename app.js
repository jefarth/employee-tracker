var inquirer = require("inquirer");
const mysql = require('mysql');

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
              'Exit System'
            ],
        })
        .then((answer) => {
            switch (answer.userOption) {
                // View
                case 'View Employees':
                    break;
                case 'View Departments':
                    break;
                case 'View Roles':
                    break;
                // Add
                case 'Add Employee':
                    break;
                case 'Add Department':
                    break;
                case 'Add Role':
                    break;
                // Update
                case 'Update Employee Role':
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

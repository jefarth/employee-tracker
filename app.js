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
    start();
});
const start = async () => {
    try {
        const userChoice1 = await inquirer.prompt([
            {
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
            }
        ]);
        doWhatUserWantsTodo(userChoice1.userOption);
      } catch (e) {
        console.log(e);
      }
};

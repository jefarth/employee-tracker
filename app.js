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
        .prompt([
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
                'Exit System',
                ],
            }
        ])
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
// Shows Departments in a list
const getDepartments = () => {
    connection.query('SELECT * FROM department', async (err, departments) => {
      if (err) throw err;
      console.table(departments);
      start();
    });
};
// Shows Roles in a list
const getRoles = () => {
    connection.query('SELECT * FROM role', async (err, roles) => {
      if (err) throw err;
      console.table(roles);
      start();
    });
};
// Add Requests
// Add Employees
const addEmployees = async () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw (err);
     inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            }, 
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role_name",
                type: "list",
                message: "What role does the employee have?",
                choices: function() {
                rolesArray = [];
                    result.forEach(result => {
                        rolesArray.push(
                            result.title
                        );
                    })
                    return rolesArray;
                }
            }
        ]) 
        .then((answer) => {
            console.log(answer);
            const role = answer.role_name;
            connection.query('SELECT * FROM role', (err, res) => {
                if (err) throw (err);
                const filteredRole = res.filter((res) => {
                    return res.title == role;
                })
                const roleId = filteredRole[0].id;
             connection.query("SELECT * FROM employee", (err, res) => {
                inquirer
                    .prompt([
                        {
                            name: "manager",
                            type: "list",
                            message: "Who is your manager?",
                            choices: function() {
                                managersArray = []
                                res.forEach(res => {
                                    managersArray.push(
                                        res.last_name
                                    )
                                })
                                return managersArray;
                            }
                        }
                    ])
                    .then((managerAnswer) => {
                        const manager = managerAnswer.manager;
                        connection.query('SELECT * FROM employee', (err, res) => {
                            if (err) throw (err);
                            const filteredManager = res.filter((res) => {
                                return res.last_name == manager;
                            })
                            const managerId = filteredManager[0].id;
                            console.log(managerAnswer);
                            const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                            const values = [answer.first_name, answer.last_name, roleId, managerId]
                            console.log(values);
                            connection.query(query, values, (err, res, fields) => {
                                console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                            })
                            getEmployees();
                        });
                    });
                });
            });
        });
    });
};

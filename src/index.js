import inquirer from 'inquirer';
import 'dotenv/config';

const questions = [
{ type: 'list',
  name: 'what to do',
  message: 'What would you like to do?',
  choices: ['View departments', 'Add department', 'View roles', 'Add role', 'View employees', 'Add employee', 'Update employee role', 'Quit'], 
    }
]

inquirer.prompt(questions)
      .then((answers) => {
        if (answers === 'View Departments'){
            viewDepartments();
        }
        if (answers === 'Add Department'){
            addDepartmetns();
        }
        if (answers === 'View Roles'){
            viewRoles();
        }
        if (answers === 'Add Role'){
            addRole();
        }
        if (answers === 'View Employees'){
            viewEmployees();
        }
        if (answers === 'Add Employee'){
            addEmployee();
        }
        if (answers === 'Update Employee Role'){
            updateEmployeeRole();
        }
        if (answers === 'Quit'){
            quit();
        }
    }
);
      

    const viewDepartments = async () => {
        try{
            const { rows } = await pool.query('SELECT * FROM departments');
            console.table(rows);
        }catch(err){
            console.error(err);
        }
      };

    const addDepartmetns = () => {
        inquirer.prompt({
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'
        })
        .then( async (answers) => {
            try{
                await pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.department]);
                console.log('Department added!');
            }catch(err){
                console.error(err);
            }
        });
    };

    const viewRoles = async () => {
        try{
            const { rows } = await pool.query('SELECT * FROM roles');
            console.table(rows);
        }catch(err){
            console.error(err);
        }
    }

    const addRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id of the role you would like to add?'
            }
        ])
        .then( async (answers) => {
            try{
                await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]);
                console.log('Role added!');
            }catch(err){
                console.error(err);
            }
        });
    }

    const viewEmployees = async () => {
        try{
            const { rows } = await pool.query('SELECT * FROM employees');
            console.table(rows);
        }catch(err){
            console.error(err);
        }
    }

    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee you would like to add?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee you would like to add?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role id of the employee you would like to add?'
            },
        ])
        .then( async (answers) => {
            try{
                await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                console.log('Employee added!');
            }catch(err){
                console.error(err);
            }
        });
    };

    const updateEmployeeRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the id of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new role id of the employee you would like to update?'
            }
        ])
        .then( async (answers) => {
            try{
                await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id]);
                console.log('Employee role updated!');
            }catch(err){
                console.error(err);
            }
        });
    }

    const quit = () => {
        console.log('Goodbye!');
        process.exit(0);
    }
    
      
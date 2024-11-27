import inquirer from 'inquirer';
import 'dotenv/config';
import { pool, connectToDb } from './connection.js';

connectToDb();

const questions = [
{ type: 'list',
  name: 'answer',
  message: 'What would you like to do?',
  choices: ['View Departments', 'Add Department', 'View Roles', 'Add Role', 'View Employees', 'Add Employee', 'Update Employee Role', 'Quit'], 
    }
];

const answersQuestions = () => {
    inquirer.prompt(questions)
      .then((answers) => {
        console.log("answers", answers);
        if (answers.answer === 'View Departments'){
            viewDepartments();
        }
        if (answers.answer === 'Add Department'){
            addDepartments();
        }
        if (answers.answer === 'View Roles'){
            viewRoles();
        }
        if (answers.answer === 'Add Role'){
            addRole();
        }
        if (answers.answer === 'View Employees'){
            viewEmployees();
        }
        if (answers.answer === 'Add Employee'){
            addEmployee();
        }
        if (answers.answer === 'Update Employee Role'){
            updateEmployeeRole();
        }
        if (answers.answer === 'Quit'){
            quit();
        }
    }
)
};
      

    const viewDepartments = async () => {
        try{
            console.log('Viewing departments');
            const { rows } = await pool.query('SELECT * FROM departments');
            console.table(rows)
            answersQuestions();
        }catch(err){
            console.error(err);
        }
      };

    const addDepartments = () => {
        inquirer.prompt({
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        })
        .then( async (answers) => {
            try{
                await pool.query(`INSERT INTO departments (name) VALUES ($1)`, [answers.department]);
                console.log('Department added!');
                answersQuestions();
            }catch(err){
                console.error(err);
            }
        });
    };


    const viewRoles = async () => {
        try{
            console.log('Viewing roles');
            const { rows } = await pool.query('SELECT * FROM roles');
            console.table(rows);
            answersQuestions();
        }catch(err){
            console.error(err);
        }
    }

    const addRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the role belong to?',
                choices: ['Sales', 'Engineering', 'Finance', 'Legal']
            }
        ])
        .then( async (answers) => {
            try{
                await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]);
                console.log('Role added!');
                answersQuestions();
            }catch(err){
                console.error(err);
            }
        });
    }

    const viewEmployees = async () => {
        try{
            const { rows } = await pool.query('SELECT * FROM employees');
            console.table(rows);
            answersQuestions();
        }catch(err){
            console.error(err);
        }
    }

    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
            },
        ])
        .then( async (answers) => {
            try{
                await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                console.log('Employee added!');
                answersQuestions();
            }catch(err){
                console.error(err);
            }
        });
    };

    const updateEmployeeRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee',
                message: "Which employee's do yo want to update?"
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role do you like to assign the selected employee?',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
            }
        ])
        
    .then( async (answers) => {
        try{
            await pool.query('UPDATE employees SET role_id = $1 WHERE first_name = $2', [answers.role_id, answers.employee]);
            console.log('Employee role updated!');
            answersQuestions();
        }catch(err){
            console.error(err);
        }
    });
    }

    const quit = () => {
        console.log('Goodbye!');
        process.exit(0);
    }


answersQuestions();
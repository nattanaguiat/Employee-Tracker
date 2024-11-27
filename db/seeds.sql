INSERT INTO departments (id, name)
VALUES (1, 'Sales'),
        (2, 'Engineering'),
        (3, 'Finance'),
        (4, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Salesperson', 80000, 1),
        (2, 'Sales Lead', 100000, 1),
        (3, 'Software Engineer', 120000, 2),
        (4, 'Lead Engineer', 150000, 2),
        (5, 'Accountant', 125000, 3),
        (6, 'Legal Team Lead', 250000, 4),
        (7, 'Lawyer', 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
        (2, 'Mike', 'Chan', 2, 1),
        (3, 'Ashley', 'Rodriguez', 3, NULL),
        (4, 'Kevin', 'Tupik', 4, 3),
        (5, 'Malia', 'Brown', 5, NULL),
        (6, 'Sarah', 'Lourd', 6, NULL),
        (7, 'Tom', 'Allen', 7, 6);
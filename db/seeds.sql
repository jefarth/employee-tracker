USE company_DB;

INSERT INTO department (name)
VALUES ("HR"), ("IT"), ("R&D");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 150000, 1),
("Engineer", 110000, 2),
("Researcher", 110000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Long", 1, 1),
("Sarah", "Fain", 2, 0),
("Micheal", "Fox", 3, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
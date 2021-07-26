USE company_DB;

INSERT INTO department (name)
VALUES
("HR"), -- department_id: 1
("IT"), -- department_id: 2
("R&D"), -- department_id: 3
("Corporate"); -- department_id: 4 -ect

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", 150, 4), -- role_id: 1
("Engineer", 110, 2), -- role_id: 2
("Researcher", 110, 3), -- role_id: 3
("Resource Director", 100, 1); -- role_id: 4 -ect

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Jake", "Long", 1), -- employee_id: 1
("Sarah", "Fain", 2), -- employee_id: 2
("Micheal", "Fox", 3), -- employee_id: 3
("Jane", "Flowers", 4); -- employee_id: 4 -ect
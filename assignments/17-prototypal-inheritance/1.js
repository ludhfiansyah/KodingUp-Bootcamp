'use strict';

/**
 * Student status enum values.
 *
 * @readonly
 * @enum {string}
 */
const StudentStatus = {
  FRESHMAN: 'freshman',
  SOPHOMORE: 'sophomore',
  JUNIOR: 'junior',
  SENIOR: 'senior',
};
Object.freeze(StudentStatus);

/**
 * Base type in the inheritance tree.
 *
 * @constructor
 * @param {string} name - Person's name.
 * @param {string} address - Person's address.
 * @param {string} phoneNumber - Person's phone number.
 * @param {string} email - Person's email.
 *
 * @property {string} name
 * @property {string} address
 * @property {string} phoneNumber
 * @property {string} email
 */
function Person(name, address, phoneNumber, email) {
  this.name = name;
  this.address = address;
  this.phoneNumber = phoneNumber;
  this.email = email;
}

/**
 * Returns a formatted string representation.
 *
 * Required format: `[Constructor Name]: [Person Name]`
 *
 * @override
 * @returns {string} The formatted representation.
 */
Person.prototype.toString = function () {
  return `\`${this.constructor.name}: ${this.name}\``;
};

/**
 * Represents a student (child of Person).
 *
 * @constructor
 * @extends Person
 * @param {string} name - Student's name.
 * @param {string} address - Student's address.
 * @param {string} phoneNumber - Student's phone number.
 * @param {string} email - Student's email.
 * @param {StudentStatusValue} status - Student class status.
 *
 * @property {StudentStatusValue} status
 */
function Student(name, address, phoneNumber, email, status) {
  Person.call(this, name, address, phoneNumber, email);
  this.status = status;
}

/**
 * Inheritance: Student --> Person
 * @type {Person}
 */
Student.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Student,
    writable: true,
    enumerable: false,
    configurable: true,
  },
});

/**
 * Returns a formatted string representation.
 *
 * Required format: `[Constructor Name]: [Person Name]`
 *
 * @override
 * @returns {string} The formatted representation.
 */
Student.prototype.toString = function () {
  return `\`${this.constructor.name}: ${this.name}\``;
};

/**
 * Represents an employee (child of Person).
 *
 * @constructor
 * @extends Person
 * @param {string} name - Employee's name.
 * @param {string} address - Employee's address.
 * @param {string} phoneNumber - Employee's phone number.
 * @param {string} email - Employee's email.
 * @param {string} company - Company's name.
 * @param {number} salary - Employee's salary.
 *
 * @property {string} company
 * @property {number} salary
 */
function Employee(name, address, phoneNumber, email, company, salary) {
  Person.call(this, name, address, phoneNumber, email);
  this.company = company;
  this.salary = salary;
}

/**
 * Inheritance: Employee --> Person
 * @type {Person}
 */
Employee.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Employee,
    writable: true,
    enumerable: false,
    configurable: true,
  },
});

/**
 * Returns a formatted string representation.
 *
 * Required format: `[Constructor Name]: [Person Name]`
 *
 * @override
 * @returns {string} The formatted representation.
 */
Employee.prototype.toString = function () {
  return `\`${this.constructor.name}: ${this.name}\``;
};

/**
 * Represents a faculty member (child of Employee).
 *
 * @constructor
 * @extends Employee
 * @param {string} name - Faculty name.
 * @param {string} address - Faculty address.
 * @param {string} phoneNumber - Faculty phone number.
 * @param {string} email - Faculty email.
 * @param {string} company - Company name.
 * @param {number} salary - Employee salary.
 * @param {string} officeHours - Faculty office hours.
 * @param {string} rank - Faculty rank.
 *
 * @property {string} officeHours
 * @property {string} rank
 */
function Faculty(
  name,
  address,
  phoneNumber,
  email,
  company,
  salary,
  officeHours,
  rank,
) {
  Employee.call(this, name, address, phoneNumber, email, company, salary);
  this.officeHours = officeHours;
  this.rank = rank;
}

/**
 * Inheritance: Faculty --> Employee
 * @type {Employee}
 */
Faculty.prototype = Object.create(Employee.prototype, {
  constructor: {
    value: Faculty,
    writable: true,
    enumerable: false,
    configurable: true,
  },
});

/**
 * Returns a formatted string representation.
 *
 * Required format: `[Constructor Name]: [Person Name]`
 *
 * @override
 * @returns {string} The formatted representation.
 */
Faculty.prototype.toString = function () {
  return `\`${this.constructor.name}: ${this.name}\``;
};

/**
 * Represents a staff member (child of Employee).
 *
 * @constructor
 * @extends Employee
 * @param {string} name - Person name.
 * @param {string} address - Person address.
 * @param {string} phoneNumber - Person phone number.
 * @param {string} email - Person email.
 * @param {string} company - Company name.
 * @param {number} salary - Employee salary.
 * @param {string} title - Staff title.
 *
 * @property {string} title
 */
function Staff(name, address, phoneNumber, email, company, salary, title) {
  Employee.call(this, name, address, phoneNumber, email, company, salary);
  this.title = title;
}

/**
 * Inheritance: Staff --> Employee
 * @type {Employee}
 */
Staff.prototype = Object.create(Employee.prototype, {
  constructor: {
    value: Staff,
    writable: true,
    enumerable: false,
    configurable: true,
  },
});

/**
 * Returns a formatted string representation.
 *
 * Required format: `[Constructor Name]: [Person Name]`
 *
 * @override
 * @returns {string} The formatted representation.
 */
Staff.prototype.toString = function () {
  return `\`${this.constructor.name}: ${this.name}\``;
};

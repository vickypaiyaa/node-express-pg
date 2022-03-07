//mockk DB env values
process.env = Object.assign(process.env, {
  DB_HOST: "testHost",
  DB_USER: "testUser",
  DB_PASSWORD: "testPassword",
  DB_NAME: "testDB",
  DB_PORT: "testPort",
  SECRET_KEY: "testSecretKey",
  ENV_PORT: "testenvPort",
});

const { students, getAllStudents, updateStudent } = require("../students");
const pg = require("../../../config/db");
const { Pool } = require("pg");

//mock db connection
jest.mock("pg", () => {
  const pg = {
    query: jest.fn(),
    connect: jest.fn(),
  };
  return { Pool: jest.fn(() => pg) };
});

//Students Post request- create/insert api for student data
describe("/students - create/insert api for student data", function () {
  let pool, response, next;
  beforeEach(() => {
    pool = new Pool();
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("it should create users", () => {
    const request = {
      body: {
        firstname: "user",
        lastname: "test",
        age: "10",
      },
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 100,
          firstname: "user",
        },
      ],
    });
    students(request, response, next);
  });
});

//Students GET request- Fetch all student data
describe("/getAllStudents - Fetch all students data", function () {
  let pool, response, next;
  beforeEach(() => {
    pool = new Pool();
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("it should fetch all students data", () => {
    const request = {
      body: {
        firstname: "user",
        lastname: "test",
        age: "10",
      },
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 100,
          firstname: "user",
        },
      ],
    });
    getAllStudents(request, response, next);
  });
});

//Students PATCH request- update student data
describe("/updateStudent - update student data", function () {
  let pool, response, next;
  beforeEach(() => {
    pool = new Pool();
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("it should update student data", () => {
    const request = {
      body: {
        firstname: "updatedUsername"
        },
        params: {
            studentId: 200
        }
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 200,
          firstname: "updatedUsername",
        },
      ],
    });
    updateStudent(request, response, next);
  });
});
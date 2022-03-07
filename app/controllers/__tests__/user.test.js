//mock DB properties
process.env = Object.assign(process.env, {
    DB_HOST: 'testHost',
    DB_USER: 'testUser',
    DB_PASSWORD: 'testPassword',
    DB_NAME: 'testDB',
    DB_PORT: 'testPort',
    SECRET_KEY: 'testSecretKey',
    ENV_PORT: 'testenvPort'
});

const { users, login, verification } = require("../users");
const pg = require('../../../config/db');
const { Pool } = require('pg');

//mock db connection
jest.mock("pg", () => {
    const pg = {
        query: jest.fn(),
        connect: jest.fn()
    }
    return { Pool: jest.fn(() => pg) };
});

//Users - POST API
describe("/users - Post request", function () {
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
      },
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          firstname: "user",
        },
      ],
    });
    users(request, response, next);
  });
});

//Login API
describe("/login - Post request", function () {
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

  it("it should logged-in for existing user", () => {
    const request = {
      body: {
        username: "user",
      },
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 123,
          firstname: "firstUser",
          lastname: "lastUser",
          username: "userName",
        },
      ],
    });
    login(request, response, next);
  });
});

//verification API
describe("/Generate verification - Post request", function () {
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

  it("it should generate verification code for exist user", () => {
    const request = {
      body: {
        userId: 1,
      },
    };
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 500
        },
      ],
    });
    verification(request, response, next);
  });
});
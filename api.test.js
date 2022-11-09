/*-------------------------------------------------------------------------------*/

/* This code was written by: */
/* Fredrik Hammarbäck */

/*-------------------------------------------------------------------------------*/

const request = require('supertest');
const app = require("./api");

/*-------------------------------------------------------------------------------*/

describe("Tester för att kontrollera endpoints.", () => {

  test("GET genererar korrekt statuskod (200).", async () => {

    const response = await request(app)
    .get("/personal");
    expect(response.statusCode).toBe(200);

  });

  /*------------------------------------------------*/

  test("POST med JSON-body genererar korrekt statuskod (201).", async () => {

    const response = await request(app)
    .post("/personal")
    .send({
     
      "id":1,
      "lastName":"test",
      "firstName":"test",
      "email":"test@test.com"

    });
    expect(response.statusCode).toBe(201);

  });

  /*------------------------------------------------*/

  test("DELETE genererar korrekt statuskod (200).", async () => {

    const response = await request(app)
    .delete("/personal/1");
    expect(response.statusCode).toBe(200);

  });

});

/*-------------------------------------------------------------------------------*/

describe("Tester för att kontrollera att fel ger rätt statuskod.", () => {

  test("Felstavning av URI genererar korrekt statuskod (404).", async () => {

    const response = await request(app)
    .get("/personals");
    expect(response.statusCode).toBe(404);

  });

  /*------------------------------------------------*/

  test("POST med ID som redan finns i databasen genererar korrekt statuskod (409).", async () => {

    const response = await request(app)
    .post("/personal")
    .send({
     
      "id":45,
      "lastName":"test",
      "firstName":"test",
      "email":"test@test.com"

    });
    expect(response.statusCode).toBe(409);

  });

  /*------------------------------------------------*/
  
  test("POST med tom variabel genererar korrekt statuskod (400).", async () => {

    const response = await request(app)
    .post("/personal")
    .send({
     
      "id":2,
      "lastName":"",
      "firstName":"test",
      "email":"test@test.com"

    });
    expect(response.statusCode).toBe(400);

  });

  /*------------------------------------------------*/

  test("POST med utebliven variabel genererar korrekt statuskod (400).", async () => {

    const response = await request(app)
    .post("/personal")
    .send({
     
      "id":3,
      "firstName":"test",
      "email":"test@test.com"

    });
    expect(response.statusCode).toBe(400);

  });

  /*------------------------------------------------*/

  test("DELETE med ID som inte finns i databasen genererar korrekt statuskod (400).", async () => {

    const response = await request(app)
    .delete("/personal/99")
    expect(response.statusCode).toBe(400);

  });

});

/*-------------------------------------------------------------------------------*/
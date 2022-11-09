# etimo_api

  Installationer:
      
  npm install express --save
  npm install body-parser --save
  npm install jest --save
  npm install supertest --save
  
  Kommandon:
  
  För att köra igång API för manuella tester: node .
  För att köra förskrivna tester: npm test
  
  CRUD:

  Hämta allt innehåll i databasen: GET http://localhost:8080/personal
  Lägg till ny person i databasen: POST http://localhost8080/personal + Body i JSON-format innehållande 'id', 'lastName', 'firstName', och 'email'
  Radera person i databasen: DELETE http://localhost:8080/personal/:id (:id är ID:t på personen i databasen man vill radera)

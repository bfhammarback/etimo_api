/*-------------------------------------------------------------------------------*/

/* This code was written by: */
/* Fredrik Hammarbäck */

/*-------------------------------------------------------------------------------*/

const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const PORT = 8080;

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )
app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`API:et är aktivt och lyssnar nu på http://localhost:${PORT}`)
)

/*-- Exempeldatabas med förinskrivna värden -------------------------------------*/

var database = [

    {id: 39, lastName: "Eriksson", firstName: "Erik", email: "erik.eriksson@email.com"},
    {id: 45, lastName: "Svensson", firstName: "Sven", email: "sven.svensson@email.com"},
    {id: 56, lastName: "Karlsson", firstName: "Karl", email: "karl.karlsson@email.com"},
    {id: 68, lastName: "Johansson", firstName: "Johan", email: "johan.johansson@email.com"},
    {id: 85, lastName: "Kermitsson", firstName: "Grodan", email: "grodan.kermitsson@email.com"}

];

var entry = {};

/*-- Variabler ------------------------------------------------------------------*/

var found = false;
var inclusion = true;
var idx = -1;

/*-- GET-kommando som returnerar innehållet i databasen -------------------------*/

app.get('/personal', (req, res) => {
    
    res.status(200).send({

        database

    })

    console.log(`Hämtning genomförd. Det begärda innehållet har skickats som respons.`)

});

/*-- POST-kommando som skriver in angivna värden i databasen --------------------*/

app.post('/personal', (req, res) => {

    
    /* Koll för att säkerställa att det angivna ID:t inte redan finns i databasen */
    
    for (let i = 0; i < database.length; i++){

        existCheck(i,req.body.id);

    }

    /* Koll för att säkerställa att all nödvändig information angavs i req.body */

    inclusionCheck(req.body.id,req.body.lastName,req.body.firstName,req.body.email);

    /* Om båda kollarna ovan genererar önskvärda resultat skrivs ett nytt entry in i databasen och respons skickas som svar */

    if (found==false && inclusion==true){
            
        entry = {
            
            id: req.body.id,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email
            
        };
        
        database.push(
            
            entry
            
        )

        console.log(`Tillägg genomfört. Lade till ${req.body.firstName} ${req.body.lastName} med ID ${req.body.id} och e-post ${req.body.email} i databasen`);
            
        res.status(201).send({

            message: `Tillägg genomfört. Lade till ${req.body.firstName} ${req.body.lastName} med ID ${req.body.id} och e-post ${req.body.email} i databasen`
            
        });
            
        entry=[];

    }

    /* Om angivet ID redan finns genereras ett felmeddelande */

    if (found==true){

        console.log(`Tillägg ej genomfört. Det angivna ID:t (${req.body.id}) finns redan i databasen`);
            
        res.status(409).send({

            message: `Tillägg ej genomfört. Det angivna ID:t (${req.body.id}) finns redan i databasen`
            
        });

        found = false;

    }

    /* Om något något nödvändigt saknades i req.body genereras ett felmeddelande */

    if (inclusion==false){

        console.log(`Tillägg ej genomfört. Ett eller flera av de nödvändiga värdena finns inte i bodyn. Säkerställ att 'id', 'lastName', 'firstName', och 'email' alla har angivits i JSON-format`);
            
        res.status(400).send({

            message: `Tillägg ej genomfört. Ett eller flera av de nödvändiga värdena finns inte i bodyn. Säkerställ att 'id', 'lastName', 'firstName', och 'email' alla har angivits i JSON-format`
            
        });

        inclusion = true;

    }

});

/*-- DELETE-kommando som tar bort personal med hjälp av ID:t som anges i URI:n --*/

app.delete('/personal/:id', (req, res) => {

    /* Koll för att hitta det angivna ID:t i databasen. Det index där ID:n hittas noteras i variabeln 'idx' */
    
    for (let i = 0; i < database.length; i++){

        existCheck(i,req.params.id);

        if(found==true){

            idx = i;
            found = false;

        }

    }

    /* Om ett index har noterats i variabeln 'idx' tas det indexet bort ur databasen och respons skickas */

    if (idx!=-1){

        console.log(`Borttagning genomförd. Tog bort ${database[idx].firstName} ${database[idx].lastName} med ID ${database[idx].id} och e-post ${database[idx].email} från databasen.`);
        
        res.status(200).send({

            message: `Borttagning genomförd. Tog bort ${database[idx].firstName} ${database[idx].lastName} med ID ${database[idx].id} och e-post ${database[idx].email} från databasen.`
    
        });

        database.splice(idx, 1);

        idx = -1;

    } else {
        
        console.log(`Borttagning ej genomförd. Det angivna ID:t finns inte i databasen.`);

        res.status(400).send({

            message: `Borttagning ej genomförd. Det angivna ID:t finns inte i databasen.`
    
        });

    }

});

/*-- Funktion för att leta upp ett visst ID i databasen -------------------------*/

function existCheck(i,providedId){

    if (database[i].id==providedId){

        found = true;

    }

}

/*-- Funktion för att kontrollera att req.body innehåller allt den skall --------*/

function inclusionCheck(id,lastName,firstName,email){

    if ( id==undefined || lastName=="" || lastName==undefined || firstName=="" || firstName==undefined || email=="" || email==undefined ){

        inclusion = false;

    }

}

/*-- Exports --------------------------------------------------------------------*/

module.exports = app;

/*-------------------------------------------------------------------------------*/
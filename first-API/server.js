var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var ingredients = [
    {
        "id": "232kAk",
        "text": "Eggs"
    }, 
    {
        "id": "232dek",
        "text": "Apple"
    },  
    {
        "id": "23w34k",
        "text": "Oats"
    }, 
    {
        "id": "ewrwer",
        "text": "Meat"
    }

];

app.get('/funions', function(request, response){
    response.send('Yo give me some funions foo!');
});

app.get('/ingredients', function(request, response){
    response.send(ingredients);
});

app.post('/ingredients', function(request, response){
    var ingredient = request.body;
    if (!ingredient || ingredient.text == "") {
        response.status(500).send({error:"Your ingredient must have text"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredient);
    }
});

app.put('/ingredients/:ingredientId', function (request, response) {

    var text = request.body.text;

    if(!text || text === "") {
        response.status(500).send({error:"You must provide ingredient text"});
    } else {
        var objectFound = false;
        for ( var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];

            if (ing.id === request.params.ingredientId) {
                ingredients[x].text = text;
                objectFound = true;
                break;
            }
        }   
    }

    if (!objectFound) {
        response.status(500).send({error:"Ingredient id not found"});
    } else {
        response.send(ingredients);
    }

});

app.listen(3000, function(){
    console.log("First API running on port 3000!");
});

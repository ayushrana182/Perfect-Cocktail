class UI{

    //Display all the Drink Categories
    displayCategories(){
        const categoryList = cocktail.getCategories()
        .then(categories => {
            const catList = categories.categories.drinks;

            //Apend a first option without value
            const firstOption = document.createElement('option');
            firstOption.textContent = '-Select-';
            firstOption.value = '';
            document.querySelector('#search').appendChild(firstOption);
               
            //Append into the select
            catList.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category.strCategory;
                option.value = category.strCategory.split(' ').join('_');
                document.querySelector('#search').appendChild(option);

            })
        })
    }



    //Displays drinks without ingredients
    displayDrinks(drinks){
        //Show the Results
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

         //Insert the results
         const resultsDiv = document.querySelector('#results');

         //Loop through drinks
         drinks.forEach(drink =>{
             resultsDiv.innerHTML +=`
             <div class = "col-md-4">
                <div class = "card my-3">
                <button type ="button" data-id="${drink.idDrink}" class= "favorite-btn btn btn-outline-info"> + </button>

                <img class = "card-img-top" src="${drink.strDrinkThumb}" 
                alt ="${drink.strDrink}">
                <div class = "card-body">
                    <h2 class = "card-title text-center">${drink.strDrink}<h2>
                    <a data-target = "#recipe" class ="btn btn-success get-recipe" href = "#" data-toggle="modal" data-id ="${drink.idDrink}">Get Recipie </a>

                    </div>
                </div>
             </div>
             `;
         });
         this.isFavorite();

    }

    //Displays drinks with ingredients
    displayDrinksWithIngredients(drinks){

        //Show the Results
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

        //Insert the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink =>{
            resultsDiv.innerHTML += `
                <div class = "col-md-6">
                    <div class = "card my-3">
                        <button type ="button" data-id="${drink.idDrink}" class= "favorite-btn btn btn-outline-info"> + </button>
                            <img class = "card-img-top" src="${drink.strDrinkThumb}" 
                            alt ="${drink.strDrink}">

                            <div class = "card-body">
                                <h2 class = "card-title text-center">${drink.strDrink}<h2>
                                <p class = "card-text font-weight-bold">Instructions</p>
                                <p class = "card-text">
                                ${drink.strInstructions}
                                </p>
                                <p class = "card-text">
                                    <ul class = "list-group">
                                        <li class ="list-group-item alert 
                                        alert-danger">Ingredients</li>
                                        ${this.displayIngredients(drink)}
                                    </ul>

                                </p>
                                <p class = "card-text font-weight-bold">Extra Information:</p>
                                <p class = "card-text">
                                    <span class ="badge badge-pill badge-success">
                                        ${drink.strAlcoholic}
                                    </span>
                                    <span class ="badge badge-pill badge-warning">
                                            Category: ${drink.strCategory}
                                    </span>

                                </p>
                            </div>
                        </div>
                    </div>
            
            `;
        });
        this.isFavorite();

    }

    //Prints the ingredients and Measurements
    displayIngredients(drink){

       // console.log(drink);
        let ingredients =[];
        for(let i =1 ; i < 16; i++){
            const ingredientMeasure ={};
            if(drink[`strIngredient${i}`] !== null){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
        //console.log(ingredients);
       //Build the template

       let ingredientsTeamplate = '';
       ingredients.forEach(ingredient =>{
           ingredientsTeamplate += `
           <li class = "list-group-item ">${ingredient.ingredient} - ${ingredient.measure}</li>
           `;
       })

       return ingredientsTeamplate;

    }

    //Displays single recipe
    displaySingleRecipe(recipe){
        //Get Variables
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

              //set the values
              modalTitle.innerHTML = recipe.strDrink;
              modalDescription.innerHTML =recipe.strInstructions;

              //Display the ingredients
               
              modalIngredients.innerHTML = this.displayIngredients(recipe);
    }


    //Displays a Custom Message
    printMessage(message, className){
        const div = document.createElement('div');

        //Add the HTML
        div.innerHTML =`
            <div class = "alert alert-dismissible alert-${className}">
                <button type = "button" class ="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

            //Insert Before
            const reference = document.querySelector('.jumbotron h1');
            const parentNode = reference.parentNode;
            parentNode.insertBefore(div, reference);

            //remove after 3 seconds
            setTimeout(()=>{
                document.querySelector('.alert').remove();

            },3000)

    }

    //Clears previous Results

    clearResults(){
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }

    //Displays favorites from the storage
    displayFavorites(favorites){
        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(drink => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
              <td>
                    <img src = "${drink.image}" alt ="${drink.name}" width =100 >
              </td>
              <td>
                    ${drink.name}
              </td>
              <td>
                    <a href ="#" data-toggle ="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe" >
                    View
              </td>

              <td>
                    <a href ="#"  data-id="${drink.id}" class="btn btn-danger remove-recipe" >
                    Remove
              </td>

            `;

            favoritesTable.appendChild(tr);
        })
    }
    //Remove single favorite from DOM
    removeFavorite(element) {
        element.remove();
    }

    //Add a class when cocktail is favourite
    isFavorite(){
        const drinks = cocktailDB.getFromDB();

        drinks.forEach(drink =>{
            //destructuring the id
            let {id} = drink;

            //Select the favorites
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink){
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }
}
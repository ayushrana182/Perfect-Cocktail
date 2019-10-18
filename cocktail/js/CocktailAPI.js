class CocktailAPI{
    //Get recipe by name
     async getDrinksByName(name){
        //Search by Name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}
        `);
        //Returns a JSON response
        const cocktails = await apiResponse.json();

        return{
            cocktails
        }
    }

    //Get recipe by ingredient
    async getDrinksByIngredient(ingredient){
        //Search by Ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        
        //wait for response then return json
        const cocktails = await apiResponse.json();
       
        return {
            cocktails
        }
    }
    //Get Single recipe
    async getSingleRecipe(id) {
        //Search by Ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        //wait for response then return json
        const recipe = await apiResponse.json();
       
        return {
            recipe
        }

    }
    //retrives all the categories from the REST API
    async getCategories(){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        //Wait for response and return JSON
        const categories = await apiResponse.json();

        return{
            categories
        }
    }

    //Get drinks by category
    async getDrinksByCategory( category ){

        //search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}    `);
        
        //wait for response then return json
        const cocktails = await apiResponse.json();
       
        return {
            cocktails
        }
    }

    //Get drinks by alcohol/non alcohol
    async getDrinksByAlcohol( term ){
        
        //search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}   `);
        
        //wait for response then return json
        const cocktails = await apiResponse.json();
       
        return {
            cocktails
        }
    }
}
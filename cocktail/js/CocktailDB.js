class CocktailDB{
    //Saves the recipes into the localStorage
    saveIntoDB(drink){
        const drinks = this.getFromDB();
        drinks.push(drink);

        //Add the new array into the localstorage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }
    //Removes element from the local storage
    
    removeFromDB(id){
        const drinks = this.getFromDB();

        //Loop
        drinks.forEach((drink,index) => {
            if(id === drink.id){
                drinks.splice(index, 1);
            }
        });
        //Set the array into the Local Storage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }



    //return recipe from storage
    getFromDB(){
        let drinks;
        //check from localstorage
        if(localStorage.getItem('drinks') === null){
            drinks = [];
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks') );
        }
        return drinks;
    }
}
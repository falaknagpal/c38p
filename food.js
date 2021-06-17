class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFeed;
        this.image = loadImage("images/milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFeedTime(lastFeed){
        this.lastFeed = lastFeed;
    }    

    deductFood(){
        if (this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        var button = createButton("Feed the Dog");
        button.position(400,125);

        if (button.mousePressed(function(){
            foodS = foodS-1;
            gameState = 1;
            database.ref('/').update({'gameState': gameState});
        }));

        var addFood = createButton("Add Food");
        addFood.position(500,125);

        if (addFood.mousePressed(function(){
            foodS = foodS+1;
            gameState = 2;
            database.ref('/').update({'gameState': gameState});
        }));
    }
}
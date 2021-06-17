var database;
var dog, dogImage, happyDogImage;
var foodS, foodStock;
var feedTime, lastFeed;
var feed, addFood;
var milk;
var gameState, readState;
var bedroomImage, gardenImage, washroomImage;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happyDog.png");
  bedroomImage = loadImage("images/Bedroom.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/Washroom.png");
  livingroomImage = loadImage("images/Living room.png");
  milkImage = loadImage("images/milk.png");
}

function setup(){
	database = firebase.database(); 
  createCanvas(800,645);

  milk = new Food();
  milkBottle2 = createSprite(550,350,20,20);
  milkBottle2.addImage(milkImage);
  milkBottle2.scale = 0.2;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(650,270,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
  feed = createButton("Feed the Dog");
  feed.position(500,40);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,40);
  addFood.mousePressed(addFoods);

  
}

function draw(){
  background(46,139,87);
  milk.display()

  if (foodS == 0){
    dog.addImage(happyDogImage);
    milkBottle2.visible = false;
  } else {
    dog.addImage(dogImage);
    milkBottle2.visible = true;
  }
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  if (gameState === 1){
    dog.addImage(happyDogImage);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if (gameState === 2){
    dog.addImage(dogImage);
    dog.scale = 0.175;
    milkBottle2.visible = false;
    dog.y = 250;
  }

  var bath = createButton("I want to take bath");
  bath.position(580,125);

  if (bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState': gameState});
  }));

  if (gameState === 3){
    dog.addImage(washroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var sleep = createButton("I am very sleepy");
  sleep.position(710,125);

  if (sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 4){
    dog.addImage(bedroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var play = createButton("Lets play !");
  play.position(500,160);

  if (play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 5){
    dog.addImage(livingroomImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var playInGarden = createButton("Lets play in park");
  playInGarden.position(585,160);

  if (playInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 6){
    dog.y = 175;
    dog.addImage(gardenImage);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFeed = data.val();
  });

  fill("black");
  textSize(20);
  if (lastFeed >= 12){
    text("Last Feed : "+lastFeed % 12+" PM",280,60);
  } else if (lastFeed == 0){
    text("Last Feed : 12 AM",280,60);
  } else {
    text("Last Feed : "+lastFeed+" AM",280,60);
  }

  //if (gameState != "hungry"){
   // feed.hide();
    //addFood.hide();
    //dog.remove();
  //} else {
    //feed.show();
    //addFood.show();
    //dog.addImage(dogImage);
  //}
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
}

function feedDog(){
  dog.addImage(happyDogImage);

  if (milk.getFoodStock() <= 0){
    milk.updateFoodStock(milk.getFoodStock()*0);
  } else {
    milk.updateFoodStock(milk.getFoodStock()-1);
  }    
  
  database.ref('/').update({
    Food: milk.getFoodStock(),
    FeedTime: hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}
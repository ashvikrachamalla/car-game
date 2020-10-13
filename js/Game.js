class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200, 250, 300);
    car2 = createSprite(300,200, 250, 300);
    car3 = createSprite(500,200, 250, 300);
    car4 = createSprite(700,200, 250, 300);
    cars = [car1, car2, car3, car4];
    car1.addImage(car1Image);
    car2.addImage(car2Image);
    car3.addImage(car3Image);
    car4.addImage(car4Image);
    car1.scale = 1.5;
    car2.scale = 1.5;
    car3.scale = 1.5;
    car4.scale = 1.5;

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsatend();
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("black");
          ellipse(x ,y ,150 ,200);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance < displayHeight*5-100){
      player.distance +=10
      player.update();
    }
    if(player.distance==displayHeight*5-100){
      console.log("gamestate2")
      gameState = 2;
      player.rank+=1;
      player.update();
      Player.updatecarsatend(player.rank);
    }
    drawSprites();
  }
  end(){
    console.log("gameended");
    game.update(2);
  }
}

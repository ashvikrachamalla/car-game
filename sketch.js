var database;
var playerCount = 0;
var gameState = 0;
var form, player,game;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background("white");

}


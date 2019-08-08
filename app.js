//
var G_log;
var G_sensor;
//
$(document).ready(function ()
{
    G_log = document.getElementById("dataLog");
    G_sensor = new Sensor();
});
//
//
$(window).load(function ()
{
    G_sensor.connect();
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);
    game.state.start('Boot');
});
//

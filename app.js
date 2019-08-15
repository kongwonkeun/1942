//
var log;
var host = "ws://localhost:5331/echo";
var socket;
var cnt = 0;
//
$(document).ready(function ()
{
    function connect() 
    {
        socket = new WebSocket(host);
        log = document.getElementById("krlog");
        log.innerHTML += "socket created = " + socket.readyState + "<br/>";
        window.W_fr = 0;

        socket.onopen = function() {
            log.innerHTML += "socket opened = " + socket.readyState + "<br/>";
            socket.send("hello server");
        }
        socket.onmessage = function(event) {
            cnt++;
            var msg = new String(event.data);
            log.innerHTML  = "RX " + cnt + " = " + msg + "<br/>";

            var str = msg.split('V');
            if (str[1].length != 9) {
                return;
            }
            var val = str[1].split('D');
            if (isNaN(val[0]) || isNaN(val[1])) {
                return;
            }
            window.W_speed = parseInt(val[0]);
            window.W_dir = parseInt(val[1]);

            log.innerHTML += "speed: " + window.W_speed + "<br/>";
            log.innerHTML += "dir: " + window.W_dir + "<br/>";
            log.innerHTML += "fr: " + window.W_fr + "<br/>";
        }
        socket.onclose = function() {
            log.innerHTML += "socket closed = " + socket.readyState + "<br/>";
            socket.close();
        }
        socket.onerror = function() {
            log.innerHTML += "socket error = " + socket.readyState + "<br/>";
        }
    }
    $('#krlog').click(function() { connect(); });
});
//
//
$(window).load(function ()
{
    $('#krlog').click();
    //var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
    var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'gameContainer');
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);
    game.state.start('Boot');
});
//

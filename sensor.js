//
function Sensor()
{
    this.host = "ws://localhost:5331/write_anything_here.php";
    this.socket;
    this.buffer = 0;
    this.data = 0;
    this.count = 0;
    this.speed = 0;
    this.direction = 0; // -1(left), 0(center), 1(right)
};

Sensor.prototype =
{
    connect: function () {
        try {
            this.socket = new WebSocket(this.host);
            G_log.innerHTML += "socket status: " + G_sensor.socket.readyState + " <br/>";

            this.socket.onopen = function () {
                G_log.innerHTML += "socket status: " + G_sensor.socket.readyState + " open<br/>";
            }

            this.socket.onmessage = function (msg) {
                var str = new String(msg.data);
                G_sensor.count++;
                G_log.innerHTML = "> " + G_sensor.count + ": "
                G_log.innerHTML += str + "<br/>";

                var split = str.split('D');

                split[0] = split[0].substring(1);
                var s = parseInt(split[0]);
                if (!isNaN(s)) G_sensor.speed = s;

                var d = parseInt(split[1]);
                if (!isNaN(d)) {
                    if (d > 17) G_sensor.direction = -1;
                    else if (d < 15) G_sensor.direction = 1;
                    else G_sensor.direction = 0;
                }
                G_log.innerHTML += "speed: " + G_sensor.speed + "<br/>";
                G_log.innerHTML += "dir: " + G_sensor.direction + "<br/>";
            }

            this.socket.onclose = function () {
                G_log.innerHTML += "socket status: " + G_sensor.socket.readyState + " (close)<br/>";
                this.socket.close();
            }
        } 
        catch(exception) {
            G_log.innerHTML += "error: " + exception + " <br/>";
        }
    },

};
//
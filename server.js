
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Water = require("./modules/Water.js");
var Deer = require("./modules/Deer.js");
var Fire = require("./modules/Fire.js");
var Mushroom = require("./modules/Mushroom.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
deerArr = [];
fireArr = [];
mushroomArr = [];

matrix = [];
grassBorn = 0;
grassEaterBorn = 0;
predatorBorn = 0;
deerBorn = 0;
waterBorn = 0;
fireBorn = 0;
mushroomBorn = 0;

weatherCount = 0;
weather = '';

startTime = Math.floor(Date.now() / 1000);
//! Setting global arrays  -- END

var time_diff = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var timeArr = [];


//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, deerCount, fireCount, mushroomCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predatorCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < deerCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < fireCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < mushroomCount; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }

    // Creating Objects

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterBorn++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassBorn++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorBorn++;
            } else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterBorn++;
            } else if (matrix[y][x] == 5) {
                var deer = new Deer(x, y);
                deerArr.push(deer);
                deerBorn++;
            } else if (matrix[y][x] == 6) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
                fireBorn++;
            } else if (matrix[y][x] == 7) {
                var mushroom = new Mushroom(x, y);
                mushroomArr.push(mushroom);
                mushroomBorn++;
            }
        }
    }

}
matrixGenerator(70, 1000, 50, 40, 200, 40, 50, 10);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (deerArr[0] !== undefined) {
        for (var i in deerArr) {
            deerArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }
    if (mushroomArr[0] !== undefined) {
        for (var i in mushroomArr) {
            mushroomArr[i].mul();
        }
    }

    //! Weather counter
    if (weatherCount > 200) {
        weatherCount = 0;
    } else {
        weatherCount++;
    }

    //! Get weather info
    if (weatherCount < 50) {
        weather = "winter";
    } else if (weatherCount < 100) {
        weather = "spring";
    } else if (weatherCount < 150) {
        weather = "summer";
    } else if (weatherCount < 200) {
        weather = "fall";
    }

    time_diff = Math.floor(Date.now() / 1000) - startTime;
    hours = Math.floor(time_diff / 3600);
    time_diff %= 3600;
    minutes = Math.floor(time_diff / 60);
    seconds = time_diff % 60;

    timeArr = [hours, minutes, seconds];
    //! Object to send

    let GrassAlive = grassArr.length;
    let GrassEaterAlive = grassEaterArr.length;
    let PredatorAlive = predatorArr.length;
    let WaterAlive = waterArr.length;
    let DeerAlive = deerArr.length;
    let FireAlive = fireArr.length;
    let MushroomAlive = mushroomArr.length;

    let sendData = {
        matrix: matrix,
        grassCounter: grassBorn,
        grassEaterCounter: grassEaterBorn,
        predatorCounter: predatorBorn,
        deerCounter: deerBorn,
        waterCounter: waterBorn,
        fireCounter: fireBorn,
        mushroomCounter: mushroomBorn,
        GrassAlive: GrassAlive,
        GrassEaterAlive: GrassEaterAlive,
        PredatorAlive: PredatorAlive,
        WaterAlive: WaterAlive,
        DeerAlive: DeerAlive,
        FireAlive: FireAlive,
        MushroomAlive: MushroomAlive,
        weather: weather,
        timeArr: timeArr,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);

}


setInterval(game, 1000)

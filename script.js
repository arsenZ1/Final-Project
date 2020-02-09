
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 8;

    var matrix = [];
    noStroke()
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let deerCountElement = document.getElementById('deerCount');
    let waterCountElement = document.getElementById('waterCount');
    let fireCountElement = document.getElementById('fireCount');
    let mushroomCountElement = document.getElementById('mushroomCount');

    let grassAliveElement = document.getElementById('grassAlive');
    let grassEaterAliveElement = document.getElementById('grassEaterAlive');
    let predatorAliveElement = document.getElementById('predatorAlive');
    let deerAliveElement = document.getElementById('deerAlive');
    let waterAliveElement = document.getElementById('waterAlive');
    let fireAliveElement = document.getElementById('fireAlive');
    let mushroomAliveElement = document.getElementById('mushroomAlive');


    let weather = document.getElementById('weather');
    let WeatherImg1Element = document.getElementById('WeatherImg1');
    let WeatherImg2Element = document.getElementById('WeatherImg2');

    let timedisp = document.getElementById('time');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        timedisp.innerText = data.timeArr[0] + ':' + data.timeArr[1] + ':' + data.timeArr[2];
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        deerCountElement.innerText = data.deerCounter;
        waterCountElement.innerText = data.waterCounter;
        fireCountElement.innerText = data.fireCounter;
        mushroomCountElement.innerText = data.mushroomCounter;

        grassAliveElement.innerText = data.GrassAlive;
        grassEaterAliveElement.innerText = data.GrassEaterAlive;
        predatorAliveElement.innerText = data.PredatorAlive;
        deerAliveElement.innerText = data.DeerAlive;
        waterAliveElement.innerText = data.WaterAlive;
        fireAliveElement.innerText = data.FireAlive;
        mushroomAliveElement.innerText = data.MushroomAlive;


        weather.innerText = data.weather;
        if (data.weather == "winter") {
            weather.innerText = "Winter";
            weather.style.color = "#218fd9";
            WeatherImg1Element.src = "/images/winter-1.png";
            WeatherImg2Element.src = "/images/winter-2.png";
        } else if (data.weather == "spring") {
            weather.innerText = "Spring";
            weather.style.color = "#78a52e";
            WeatherImg1Element.src = "/images/spring-1.png";
            WeatherImg2Element.src = "/images/spring-2.png";
        } else if (data.weather == "summer") {
            weather.innerText = "Summer";
            weather.style.color = "#fec107";
            WeatherImg1Element.src = "/images/summer-1.png";
            WeatherImg2Element.src = "/images/summer-2.png";
        } else if (data.weather == "fall") {
            weather.innerText = "Fall";
            weather.style.color = "#d16900";
            WeatherImg1Element.src = "/images/fall-1.png";
            WeatherImg2Element.src = "/images/fall-2.png";
        }
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('grey');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (weather.innerText == "Winter") {
                        fill("#defce2");
                    } else {
                        fill("#038203");
                    }
                } else if (matrix[i][j] == 2) {
                    if (weather.innerText == "Winter") {
                        fill("#f7ef59");
                    } else {
                        fill("#e3d807");
                    }
                } else if (matrix[i][j] == 3) {
                    if (weather.innerText == "Winter") {
                        fill("#b35cff");
                    } else {
                        fill('#951efc');
                    }
                } else if (matrix[i][j] == 4) {
                    if (weather.innerText == "Winter") {
                        fill("#4a4fb0");
                    } else {
                        fill("#001dd6");
                    }
                } else if (matrix[i][j] == 5) {
                    if (weather.innerText == "Winter") {
                        fill("#914f39");
                    } else {
                    fill('#913111');
                    }
                } else if (matrix[i][j] == 6) {
                    if (weather.innerText == "Winter") {
                        fill("#f04d4d");
                    } else {
                        fill('#ff0000');
                    }
                } else if (matrix[i][j] == 7) {
                    if (weather.innerText == "Winter") {
                        fill("#362f2f");
                    } else {
                    fill('#000000');
                    }
                }
                else {
                    fill('grey');
                }
                rect(j * side, i * side, side, side);
            }
        }
    }

}

var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Water extends LiveForm  {
    constructor(x, y) {
        super(x, y);
        this.life = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        let arr = [];

        for (let index = 0; index < this.directions.length; index++) {
            let x = this.directions[index][0];
            let y = this.directions[index][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == char) {
                    arr.push(this.directions[index])
                }
            }
        }

        return arr;
    }
    mul() {
        this.life++;
        let newCell = random(this.chooseCell(0));
        let mulRate = 0;

        if (weather == "winter"){
          mulRate = 30;
        } else if (weather == "spring") {
          mulRate = 6;
        } else if (weather == "summer") {
          mulRate = 8;
        } else if (weather == "fall") {
          mulRate = 10;
        }

        if (newCell && this.life > mulRate) {
            waterBorn++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let water = new Water(x, y);
            waterArr.push(water);
            this.life = 0;
        }
    }
}

var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        let mulRate = 0;

        if (weather == "winter"){
          mulRate = 30;
        } else if (weather == "spring") {
          mulRate = 6;
        } else if (weather == "summer") {
          mulRate = 8;
        } else if (weather == "fall") {
          mulRate = 20;
        }

        if (newCell && this.multiply > mulRate) {
            grassBorn++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0;
        }
    }
}

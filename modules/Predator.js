var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 0;
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
    getNewDirections() {
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
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            predatorBorn++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < predatorArr.length; index++) {
            if (predatorArr[index].x == this.x && predatorArr[index].y == this.y) {
                predatorArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(2));
        if (!newCell) {
            newCell = random(this.chooseCell(5).concat(this.chooseCell(7)));
        }
        if (newCell) {
            if (matrix[newCell[1]][newCell[0]] == 7) {
                this.energy += 5;
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.y = y;
                this.x = x;

                for (let index = 0; index < grassEaterArr.length; index++) {
                    if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                        grassEaterArr.splice(index, 1)
                    }
                }
                this.die();
            } else {
                this.energy += 5;
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.y = y;
                this.x = x;

                for (let index = 0; index < grassEaterArr.length; index++) {
                    if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                        grassEaterArr.splice(index, 1)
                    }
                }

                let mulRate = 0;

                if (weather == "winter") {
                    mulRate = 40;
                } else if (weather == "spring") {
                    mulRate = 30;
                } else if (weather == "summer") {
                    mulRate = 30;
                } else if (weather == "fall") {
                    mulRate = 40;
                }

                if (this.energy > mulRate) {
                    this.mul()
                }
            }

        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (newCell && this.energy < 0) {
            this.die();
        }
        if (this.energy < 0) {
            this.die();
        }
    }
}

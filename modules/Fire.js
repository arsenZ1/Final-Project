var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Fire extends LiveForm {
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
            fireBorn++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let fire = new Fire(x, y);
            fireArr.push(fire);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < fireArr.length; index++) {
            if (fireArr[index].x == this.x && fireArr[index].y == this.y) {
                fireArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(1).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(4)).concat(this.chooseCell(5)));
        if (newCell) {
            this.energy++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < waterArr.length; index++) {
                if (waterArr[index].x == x && waterArr[index].y == y) {
                    waterArr.splice(index, 1)
                }
            }

            let mulRate = 0;

            if (weather == "winter"){
              mulRate = 50;
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
        else { this.move() }
    }
    move() {
        this.energy -= 3;
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
    }
}

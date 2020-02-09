var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Mushroom extends LiveForm {
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

    if (weather == "winter") {
      mulRate = 40;
    } else if (weather == "spring") {
      mulRate = 30;
    } else if (weather == "summer") {
      mulRate = 30;
    } else if (weather == "fall") {
      mulRate = 30;
    }

    if (newCell && this.multiply > mulRate) {
      mushroomBorn++;
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 7;
      let mushroom = new Mushroom(x, y);
      mushroomArr.push(mushroom);
      this.multiply = 0;
    }
  }
}

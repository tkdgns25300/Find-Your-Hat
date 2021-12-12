const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const fieldExample = [
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ];

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        // Set the "home" position before the game starts
        this.field[0][0] = pathCharacter;
    }
    

    print() {
        const field = this.field.map(e => e.join('')).join('\n');
        console.log(field);
    }

    askQuestion() {
        const input = prompt('Which way? ').toUpperCase();
        switch (input) {
            case 'W':
                this.locationY--;
                break;
            case 'A':
                this.locationX--;
                break;
            case 'S':
                this.locationY++;
                break;
            case 'D':
                this.locationX++;
                break;
            default:
                console.log('Please input W, A, S, or D')
                this.askQuestion();
                break;
        }
    }
    

    runGame() {
        let playing = true;
        console.log('Up: W')
        console.log('Left: A')
        console.log('Down: S')
        console.log('Right: D')
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Sorry.. you are out of area')
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry.. you fell into a hole')
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats! you found a Hat!')
                playing = false;                
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
    }

    isHat() {
    return this.field[this.locationY][this.locationX] === hat;
    }
    
    isHole() {
    return this.field[this.locationY][this.locationX] === hole;
    }

    static generateField(width, height, percentage = 0.1) {
        // make field
        const field = new Array(height).fill(0).map(e => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                field[y][x] = Math.random() > percentage ? fieldCharacter : hole;
            }
        }
        // set hat's location
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }
        // hat's location !== start point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        // return field
        return field;
    }
    
}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();
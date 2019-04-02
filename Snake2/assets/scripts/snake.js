var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path='sizeProperties.ts'/>
var Treat = /** @class */ (function () {
    function Treat(x_cord, y_cord) {
        this.size = 1;
        this.location = { x: x_cord, y: y_cord };
        this.alreadySet = false;
    }
    Treat.prototype.getLocation = function () {
        return this.location;
    };
    return Treat;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = 5;
        _this.color = "green";
        return _this;
    }
    return Apple;
}(Treat));
var Lemon = /** @class */ (function (_super) {
    __extends(Lemon, _super);
    function Lemon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = 3;
        _this.color = "yellow";
        return _this;
    }
    return Lemon;
}(Treat));
var Orange = /** @class */ (function (_super) {
    __extends(Orange, _super);
    function Orange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = 2;
        _this.color = "orange";
        return _this;
    }
    return Orange;
}(Treat));
var Berry = /** @class */ (function (_super) {
    __extends(Berry, _super);
    function Berry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = 1;
        _this.color = "blue";
        return _this;
    }
    return Berry;
}(Treat));
var Cherry = /** @class */ (function (_super) {
    __extends(Cherry, _super);
    function Cherry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = 8;
        _this.color = "red";
        return _this;
    }
    return Cherry;
}(Treat));
/// <reference path='sizeProperties.ts'/>
/// <reference path='treat.ts'/>
var TreatFactory = /** @class */ (function () {
    function TreatFactory() {
        this.APPLE = 1;
        this.ORANGE = 2;
        this.LEMON = 3;
        this.CHERRY = 4;
        this.BERRY = 5;
    }
    TreatFactory.prototype.setPosition = function (x, y) {
        this.x_cord = x;
        this.y_cord = y;
        return this;
    };
    TreatFactory.prototype.setRandomPosition = function (sizeProperties) {
        this.x_cord = Math.floor(Math.random() * sizeProperties.height);
        this.y_cord = Math.floor(Math.random() * sizeProperties.width);
        return this;
    };
    //Pick a treat
    TreatFactory.prototype.selectTreatType = function () {
        this.fruitSelecter = Math.floor((Math.random() * 5)) + 1;
        return this;
    };
    TreatFactory.prototype.build = function () {
        switch (this.fruitSelecter) {
            case this.APPLE:
                return new Apple(this.x_cord, this.y_cord);
            case this.ORANGE:
                return new Orange(this.x_cord, this.y_cord);
            case this.LEMON:
                return new Lemon(this.x_cord, this.y_cord);
            case this.BERRY:
                return new Berry(this.x_cord, this.y_cord);
            case this.CHERRY:
                return new Cherry(this.x_cord, this.y_cord);
            default:
                throw new Error("Fruit wasn't created");
        }
    };
    return TreatFactory;
}());
/// <reference path='treatFactory.ts'/>
var Board = /** @class */ (function () {
    function Board(sizeProperties) {
        this.sizeProperties = sizeProperties;
        this.updateTreat(true);
    }
    Board.prototype.updateTreat = function (force) {
        if (force) {
            this.treat = new TreatFactory().setRandomPosition(this.getSizeProperties()).selectTreatType().build();
        }
    };
    Board.prototype.getSizeProperties = function () {
        return this.sizeProperties;
    };
    Board.prototype.getTreat = function () {
        return this.treat;
    };
    return Board;
}());
/// <reference path='board.ts'/>
var Snake = /** @class */ (function () {
    function Snake(xInit, yInit, size, directionInit) {
        this.elements = [];
        this.elements.push({ x: xInit, y: yInit });
        this.direction = directionInit;
        this.size = size;
        this.elongation = 0;
        this.alreadySet = false;
    }
    Snake.prototype.move = function () {
        var lastElement = this.elements[this.elements.length - 1];
        // Reinitialise the alreadySet variable
        this.alreadySet = false;
        // Elongate or just move
        if (this.elongation) {
            this.elongation--;
        }
        else {
            this.elements = this.elements.slice(1); // pop the last one	
        }
        // get the direction move
        switch (this.direction) {
            case Snake.U:
                var newElement = { x: lastElement.x - 1, y: lastElement.y };
                break;
            case Snake.D:
                var newElement = { x: lastElement.x + 1, y: lastElement.y };
                break;
            case Snake.L:
                var newElement = { x: lastElement.x, y: lastElement.y - 1 };
                break;
            case Snake.R:
                var newElement = { x: lastElement.x, y: lastElement.y + 1 };
                break;
            default:
                throw new Error("Unknown direction " + this.direction);
        }
        // got to the other side
        if (newElement.x < 0) {
            newElement.x += this.size.width;
        }
        if (newElement.x >= this.size.width) {
            newElement.x -= this.size.width;
        }
        if (newElement.y < 0) {
            newElement.y += this.size.height;
        }
        if (newElement.y >= this.size.height) {
            newElement.y -= this.size.height;
        }
        this.elements.push(newElement);
    };
    Snake.prototype.isLastMoveValid = function () {
        var lastElement = this.elements[this.elements.length - 1];
        var isValid = true;
        this.elements.forEach(function (element) {
            if (element != lastElement && element.x == lastElement.x && element.y == lastElement.y) {
                isValid = false;
            }
        });
        return isValid;
    };
    Snake.prototype.setDirection = function (direction) {
        if (this.alreadySet || this.getOpposite(direction) === this.direction) {
            // do nothing
        }
        else {
            this.direction = direction;
            this.alreadySet = true;
        }
    };
    Snake.prototype.getDirection = function () {
        return this.direction;
    };
    Snake.prototype.getOpposite = function (direction) {
        switch (direction) {
            case Snake.U:
                return Snake.D;
            case Snake.D:
                return Snake.U;
            case Snake.L:
                return Snake.R;
            case Snake.R:
                return Snake.L;
        }
    };
    Snake.prototype.getSnakeParts = function () {
        return this.elements;
    };
    Snake.prototype.elongate = function (size) {
        this.elongation = this.elongation + size;
    };
    Snake.prototype.getLookUpSnake = function () {
        var snakeParts = this.getSnakeParts();
        var head = this.getHead();
        var snakeFastLookUp = {};
        snakeParts.forEach(function (element) {
            snakeFastLookUp[element.x + "-" + element.y] = true;
        });
        snakeFastLookUp[head.x + "-" + head.y] = false; // set the head to false;
        return snakeFastLookUp;
    };
    Snake.prototype.getHead = function () {
        var snakeParts = this.getSnakeParts();
        return snakeParts[snakeParts.length - 1];
    };
    Snake.U = "Up";
    Snake.D = "Down";
    Snake.L = "Left";
    Snake.R = "Right";
    return Snake;
}());
/// <reference path='board.ts'/>
/// <reference path='snake.ts'/>
/// <reference path='treat.ts'/>
var Renderer = /** @class */ (function () {
    function Renderer(snake, board, p) {
        this.snake = snake;
        this.board = board;
        this.p = p;
        this.M = this.board.getSizeProperties().height;
        this.N = this.board.getSizeProperties().width;
        this.initialize();
    }
    Renderer.prototype.initialize = function () {
        this.gameElement = document.getElementById(this.p.gameId);
        while (this.gameElement.firstChild) {
            this.gameElement.removeChild(this.gameElement.firstChild);
        } // empty the potential children
        this.gameElement.style.width = this.p.cellW * this.M + "px";
        this.gameElement.style.height = this.p.cellH * this.N + "px";
        this.cells = new Array(this.M);
        for (var i = 0; i < this.M; i++) {
            this.cells[i] = new Array(this.N);
            for (var j = 0; j < this.N; j++) {
                this.cells[i][j] = document.createElement('div');
                this.gameElement.appendChild(this.cells[i][j]);
            }
        }
    };
    Renderer.prototype.paint = function () {
        this.paintGrid();
    };
    Renderer.prototype.paintGrid = function () {
        // Paint the snake		
        var snakeFastLookUp = this.snake.getLookUpSnake();
        var head = this.snake.getHead();
        for (var i = 0; i < this.M; i++) {
            for (var j = 0; j < this.N; j++) {
                var newClass = snakeFastLookUp[i + "-" + j] ? "cell snake" : "cell empty";
                if (this.cells[i][j].className != newClass) {
                    this.cells[i][j].className = newClass;
                }
            }
        }
        // Paint the treat
        var treat = this.board.getTreat();
        var location = treat.getLocation();
        this.cells[location.x][location.y].className = "cell treat-" + treat.size;
        // Paint the head
        this.cells[head.x][head.y].className = "cell snake-head snake-head-" + this.snake.getDirection();
    };
    return Renderer;
}());
/// <reference path='snake.ts'/>
var GameController = /** @class */ (function () {
    function GameController(snake) {
        this.snake = snake;
        this.initializeListeners();
    }
    GameController.prototype.initializeListeners = function () {
        var _this = this;
        var mapping = {
            //Besturen met WASD
            38: Snake.U,
            39: Snake.R,
            40: Snake.D,
            37: Snake.L
        };
        document.onkeydown = (function (e) {
            console.log(e);
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode && mapping[charCode]) {
                _this.snake.setDirection(mapping[charCode]);
            }
        });
    };
    return GameController;
}());
/// <reference path='board.ts'/>
/// <reference path='snake.ts'/>
/// <reference path='renderer.ts'/>
/// <reference path='gameController.ts'/>
var Game = /** @class */ (function () {
    function Game(sizeProperties, rendererProperties) {
        this.init();
    }
    Game.prototype.init = function () {
        // Initialize the game
        // -- models
        this.board = new Board(sizeProperties);
        this.snake = new Snake(sizeProperties.height / 2, sizeProperties.width / 2, sizeProperties, Snake.R);
        // -- renderer
        this.renderer = new Renderer(this.snake, this.board, rendererProperties);
        // -- controller
        this.controller = new GameController(this.snake);
    };
    Game.prototype.start = function () {
        // start the game loop
        this.speed = 200;
        this.renderer.paint();
        this.gameLoop(this);
    };
    Game.prototype.gameLoop = function (that) {
        that.board.updateTreat(false);
        that.dealWithTreat();
        that.snake.move();
        that.renderer.paint();
        if (that.snake.isLastMoveValid()) {
            that.speed = Math.max(100, that.speed - 1);
            window.setTimeout(that.gameLoop, that.speed, that);
        }
        else {
            alert("Haha, you lost");
            that.init();
            that.start();
        }
    };
    Game.prototype.dealWithTreat = function () {
        var _this = this;
        var treat = this.board.getTreat();
        var location = treat.getLocation();
        this.snake.getSnakeParts().forEach(function (element) {
            if (element.x == location.x && element.y == location.y) {
                _this.snake.elongate(treat.size);
                _this.board.updateTreat(true);
                _this.dealWithTreat();
            }
        });
    };
    return Game;
}());
/// <reference path='board.ts'/>
/// <reference path='renderer.ts'/>
/// <reference path='game.ts'/>
var rendererProperties = {
    cellW: 20,
    cellH: 20,
    gameId: "snake"
};
var sizeProperties = {
    width: 30,
    height: 30
};
document.addEventListener("DOMContentLoaded", function (event) {
    var game = new Game(sizeProperties, rendererProperties);
    game.start();
});

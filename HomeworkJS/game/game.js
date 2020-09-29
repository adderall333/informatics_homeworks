const groundHeight = 500;
const groundWidth = 1000;

window.onload = function() {
    var leftPlayer = document.getElementById("left-player");
    var rightPlayer = document.getElementById("right-player");
    var ball = document.getElementById("ball");

    class Player {
        constructor(top) {
            this.top = top;
            this.heught = 90;
            this.witdth = 6;
            this.points = 0;
            this.direction = 0;
            this.velocity = 4;
        }

        move() {
            this.top += this.direction * this.velocity;
            this.top = this.top > 790 ? 790 : this.top;
            this.top =  this.top < 180 ? 180 : this.top;
        }
    }

    class Ball {
        constructor(x, y, direction) {
            this.x = x;
            this.y = y;
            this.direction = direction;
            this.radius = 2;
            this.velocity = 1;
        }

        move(leftPlayer, rightPlayer) {
            this.velocity += 0.5;
            if (this.isHitWithPlayer(leftPlayer, rightPlayer)) {
                this.direction %= 2 * Math.PI;
                this.direction += Math.PI / 2 * Math.tg(this.direction) > 0 ? 1 : -1;
            }
            if (this.isHitWithHorizontalWall) {
                this.direction %= 2 * Math.PI;
                this.direction += Math.PI / 2 * Math.tg(this.direction) > 0 ? -1 : 1;
            }
            if (this.isHitWithLeftWall) {
                rightPlayer.points++;
                startNewRound();
            }
            if (this.idHitWithRightWall) {
                leftPlayer.points++;
                startNewRound();
            }
            this.x += this.velocity * Math.sin(this.direction);
            this.y += this.velocity * Math.cos(this.direction);
        }

        isHitWithPlayer(leftPlayer, rightPlayer) {

        }

        isHitWithHorizontalWall() {
            return this.y + this.radius >= groundHeight || this.y - this.radius <= 0; 
        }

        isHitWithLeftWall() {
            return this.x - this.radius <= 0; 
        }

        isHitWithRightWall() {
            return this.x + this.radius >= groundWidth; 
        }
    }

    class Game {
        constructor() {
            this.leftPlayer = new Player(395);
            this.rightPlayer = new Player(395);
            this.ball = new Ball(groundWidth / 2, groundHeight / 2, 0);
        }

        startNewRound() {
            setTimeout(function() {
                
            }, 2000);
        }

        startGame() {
            document.addEventListener('keydown', function(event) {
                if (event.code == 'ArrowUp') {
                    this.rightPlayer.direction = -1;
                }
            });
            document.addEventListener('keydown', function(event) {
                if (event.code == 'ArrowDown') {
                    this.rightPlayer.direction = 1     
                }
            });

            document.addEventListener('keydown', function(event) {
                if (event.code == 'KeyW') {
                    this.leftPlayer.direction = -1;
                }
            });
            document.addEventListener('keydown', function(event) {
                if (event.code == 'KeyS') {
                    this.leftPlayer.direction = 1;     
                }
            });
        }

        draw() {
            leftPlayer.style.top = this.leftPlayer.top.toString() + "px";
            rightPlayer.style.top = this.rightPlayer.top.toString() + "px";
        }

        update() {
            this.leftPlayer.move();
            this.rightPlayer.move();
            this.draw();
        }
    }

    game = new Game();
    game.startGame();
    alert(game.leftPlayer.points);
    let timer = setInterval(() => {
        game.update();
    }, 20);
}


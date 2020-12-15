class SnakeGame {
    /**
     * @param canvas
     */
    constructor(canvas) {
        this.canv = canvas; // využije se při konci hry (aby se spustila nová)
        this.ctx = canvas.getContext('2d'); // context canvasu 2D
        this.font = '40px Fredoka One';
        this.interval = 1000/10; // interval kolikrát se má zopakovat draw() za sekund, 10 snímků za sekundu
        this.box = 32; // 19x32 = 608 (výška a šířka canvas), velikost hada/jídla
        this.snake = []; // pole hada (ukládají se pozice každého čtverce hada)
        this.snake[0] = { // první část hada (první čtvereček)
            x: 9 * this.box, // horizontalně vycentrované
            y: 10 * this.box, // vertikálně vycentrované
        };
        this.food = this.newPos(); // vygeneruje pozici (x,y) pro jablko
        this.score = 0; // skóre hry
        this.img = {
            ground: new Image(), // pozadí canvas
            apple: new Image() // jablko
        };
        this.controls = {
            UP: ['ArrowUp', 'KeyW'],
            LEFT: ['ArrowLeft', 'KeyA'],
            DOWN: ['ArrowDown', 'KeyS'],
            RIGHT: ['ArrowRight', 'KeyD']
        };
        this.img.ground.src = "img/ground.png";
        this.img.apple.src = "img/apple.png";
        this.audio = {
            dead: new Audio('audio/dead.mp3'), // zvuk při smrti
            eat: new Audio('audio/eat.mp3') // zvuk při nažrání :D
        };
        this.snakeProperties = {
            fillColor: "green",
            shadowColor: "#e8f5e9",
        };
        // nastavení hlasitosti zvuku (1 = orig.)
        this.audio.dead.volume = 0.35;
        this.audio.eat.volume = 0.75;
        //časovač, více v logic()
        this.time = 0; // časovač v menu
    }

    /**
     * @returns {{x: number, y: number}}
     */
    newPos() { // funkce na vytvoření nové pozice
        return {
            x: Math.floor(Math.random() * 17 + 1) * this.box,
            y: Math.floor(Math.random() * 15 + 3) * this.box
        };
    }

    /**
     * @param {object} h
     * @param {array} a
     * @returns {boolean}
     */
    static bodyCollision(h,a) { // kontrola jestli do sebe tělo hada nenarazilo
        for(let i = 0; i < a.length; i++) {
            if(h.x === a[i].x && h.y === a[i].y) return true;
        }
    }

    drawCanvas() { // funkce na vykreslení
        this.ctx.drawImage(this.img.ground,0,0); // pozadí
        this.ctx.drawImage(this.img.apple, this.food.x, this.food.y); // načtení obrázku jídla na určitou pozici (food.x, food.y)

        this.ctx.font = this.font; // písmo
        this.ctx.fillStyle = "#f1f2c9"; // barva

        this.ctx.fillText(this.score,2*this.box,1.6*this.box); // vypíše skóre
        this.ctx.fillText('🕒' + (this.time/(this.interval/10)).toString(),7.5*this.box,1.6*this.box); // časovač/stopky
        this.ctx.fillText('🏆' + parseInt(localStorage.getItem('Snake_maxScore')),15*this.box,1.6*this.box); // nejvyšší skóre, uloženo v localStorage
    }

    logic() {
        this.drawCanvas(); // vykreslí se hrací pole (canvas)

        if(this.started) { // pokud už hra začala (kliknutím na šipku)
            this.time++; // bude se přidávat do třidní proměnné každých 100ms (this.interval) a poté se vydělí.. this.time/(this.interval/10)
        }

        for(let i = 0; i < this.snake.length ; i++){ // vykreslování hada
            this.ctx.fillStyle = this.snakeProperties.fillColor;
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,this.box,this.box); // čtvereček hada

            canvasUtils.shadowRect(this.ctx, this.snake[i].x,this.snake[i].y,this.box,this.box,1.5, this.snakeProperties.shadowColor); // border okolo hada
        }

        let snakeX = this.snake[0].x;
        let snakeY = this.snake[0].y;

        if(this.controls.LEFT.includes(this.dirc)) snakeX -= this.box; // levo
        if(this.controls.UP.includes(this.dirc)) snakeY -= this.box; // nahoru
        if(this.controls.RIGHT.includes(this.dirc)) snakeX += this.box; // pravo
        if(this.controls.DOWN.includes(this.dirc)) snakeY += this.box; // dolu

        if(!localStorage.getItem('Snake_maxScore')) localStorage.setItem('Snake_maxScore', '0'); // pokud v localStorage není uloženo nejvyšší skóre, tak bude nastaveno na nula.

        if(snakeX === this.food.x && snakeY === this.food.y) {
            this.food = this.newPos(); // nové místo pro jídlo
            this.score++; // přidá se bod do skóre
            this.audio.eat.play(); // spustí eat.mp3 zvuk

            if (snakeX === this.food.x && snakeY === this.food.y) this.food = this.newPos(); // pokud se vygeneruje jídlo na stejné pozici vygeneruje se znova
            if (this.score > parseInt(localStorage.getItem('Snake_maxScore'))) { // pokud je skóre větší jak to největší uložené
                localStorage.setItem('Snake_maxScore', this.score); // nastaví se aktuální skóre do localStorage
            }
        } else {
            this.snake.pop(); // odstraní se poslední čtvereček z hada (odstraní se poslední hodnota z pole this.snake)
        }

        let newHead = { // objekt pro uložení pozice hlavy hada
            x : snakeX,
            y : snakeY
        };

        if(snakeX < this.box || snakeX > 17 * this.box || snakeY < 3*this.box || snakeY > 17*this.box || SnakeGame.bodyCollision(newHead, this.snake)) { // konec hry
            clearInterval(this.game); // odstraní smyčku ve které se vykonává this.draw()
            let game = new SnakeGame(this.canv); // vytvoří se nová hra ze stejným canvasem
            this.audio.dead.play(); // spustí se zvuk úmrtí
            setTimeout(() => { // za 100ms (kvůli reakci na konec hry)
                scoreMessage(this.score, msg => alert(msg)); // se napíše náhodná zpráva podle skóre (více v SnakeMessages.js)
                game.play(); // nová hra se spustí
            },100);
        }

        this.snake.unshift(newHead);
    }

    /**
     * @param event
     */
    direction(event) {
        let key = event.code;
        if([].concat(...Object.values(this.controls)).includes(key)) this.started = true;

        if (this.controls.LEFT.includes(key) && !this.controls.RIGHT.includes(key)) this.dirc = key; // doleva
        else if (this.controls.UP.includes(key) && !this.controls.DOWN.includes(key)) this.dirc = key; // nahoru
        else if (this.controls.RIGHT.includes(key) && !this.controls.LEFT.includes(key)) this.dirc = key; // doprava
        else if (this.controls.DOWN.includes(key) && !this.controls.UP.includes(key)) this.dirc = key; // dolu
    }

    play() { // funkce která spustí vše potřebné
        document.addEventListener("keydown", e => this.direction(e)); // zavolá se při kliku na šipky
        this.game = setInterval(() => this.logic(), this.interval); // this.logic() se zopakuje 100x/s (this.interval)
    }
}


/**
 * @type {SnakeGame}
 */
let gameInstance = new SnakeGame(document.getElementById('appGame')); // nová hra
gameInstance.play(); // hra "incializována"

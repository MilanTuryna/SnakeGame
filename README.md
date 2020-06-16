# SnakeGame
Klasická arkádová hra objektově naprogramovaná v Javascriptu s využitím ES6 (třídy..).
## Hra stručně
- had
- časovač
- skóre
- maximální skóre
  - ukládání pomocí localStorage
- zvuky
  - při úmrtí 
  - při potravě
- obrázky
  - apple.png: potrava, jablko
  - ground.png: hrací plocha
- náhodné zprávy po konci hry
- přívětivý design
- oop
- canvas
## Struktura hry
- **snakeGame** (hlavní třída)
  - `constructor(canvas)`
  - `newPos()`
  - `static bodyCollision(head, array)`
  - `drawCanvas()`
  - `logic()`
  - `direction(event)`
  - `play()`
- **canvasUtils** (objekt s pomocnými funkcemi ke správě canvasu)
  - `shadowRect(ctx,x,y,w,h,repeats,color)` 
    - řešení: [how-to-make-a-shadow-in-html-canvas](https://stackoverflow.com/questions/29393591/how-to-make-a-shadow-in-html-canvas)
- **snakeMessages** (soubor s konstantou náhodných zpráv a funkcí k vypsání)
  - `snakeMessages`
  - `scoreMessage(score, callback)`
  
  
   

var playerY, ctx, enemyY, playerPoints = 0, enemyPoints = 0, playerKey, enemyKey, difficulty
var ballY, ballX, ballXOrientation, ballYOrientation
const height=500, width=800, paddleWidth=20, paddleHeight=200, playerX = 10, enemyX = width - paddleWidth - 10

function control(){
    document.addEventListener(`keydown`,function(ev){
        if(ev.keyCode == 87 || ev.keyCode == 83){
            playerKey = ev.keyCode
        }
    })
    document.addEventListener(`keyup`,function(ev){
        if(ev.keyCode == 87 || ev.keyCode == 83){
            playerKey = null
        }
    })
}

function ball(){
    ballYOrientation = ballXOrientation = Math.pow(2, Math.floor(Math.random()*2)+1)-3
    ballX = ballY = width/2-10
}

function drawStuff(x,y,width,height,color=`#fff`){
    ctx.fillStyle = color
    ctx.fillRect(x,y,width,height)
    ctx.fillStyle = "#000"
}

function draw(){
    drawStuff(0,0,width,height,`#000`)
    drawStuff(playerX, playerY, paddleWidth, paddleHeight)
    drawStuff(enemyX, enemyY, paddleWidth, paddleHeight)
    drawStuff(ballX, ballY, 10, 10)
    points()
    endGame()
}

function points(){
    ctx.font = `30px monospace`
    ctx.fillStyle = `#fff`
    ctx.fillText(playerPoints, width/4, 50)
    ctx.fillText(enemyPoints, 3*(width/4), 50)
}

function endGame(){
    if(enemyPoints >= 10){
        ctx.font = `50px monospace`
        ctx.fillStyle = `#fff`
        ctx.fillText( `You Lose!`, width/2, 450)
        restartProgram()
    }
    else if(playerPoints >= 10){
        ctx.font = `50px monospace`
        ctx.fillStyle = `#fff`
        ctx.fillText( `You Win!`, width/2, 450)
        restartProgram()
    }
}

function setup(){
    const canvas = document.getElementById(`canvas`)
    ctx = canvas.getContext(`2d`)
    playerY = enemyY = (height/2)-(paddleHeight/2)
    setInterval(loop,1000/60)
    ball()
    control()
}

function loop(){
    if(ballX >= playerX && ballX <=playerX + 10 && ballY >= playerY && ballY <= playerY + paddleHeight){
        ballXOrientation = 1
    }
    else if(ballX >= enemyX && ballX <= enemyX + 10 && ballY >= enemyY && ballY <= enemyY + paddleHeight){
        ballXOrientation = -1
    }
    if(ballY + 10 >= height || ballY <= 0){
        ballYOrientation *=-1
    }

    ballX += 9*ballXOrientation
    ballY += 9*ballYOrientation

    if(ballX + 10 > width){
        playerPoints++
        console.log(playerPoints, enemyPoints)
        if(playerPoints < 10){
            ball()
        }  
    }
    else if(ballX < 0){
        enemyPoints++
        console.log(playerPoints, enemyPoints)
        if(enemyPoints < 10){
            ball()
        }
    }

    if(playerKey == 87 && playerY > 0){
        playerY -= 10
    }
    else if(playerKey == 83 && playerY + paddleHeight < height){
        playerY += 10
    }

    var enemyMiddle = enemyY + paddleHeight/2
    // if(enemyMiddle > ballY && enemyY > 0){
    //     enemyY -= 10
    // }
    // else if(enemyMiddle << ballY && enemyY + paddleHeight < height){
    //     enemyY += 10
    // }
    if (enemyMiddle < ballY && enemyY + paddleHeight < height) {
        enemyY += 4
      } else if (enemyMiddle > ballY && enemyY > 0) {
        enemyY -= 4
      }
    
    draw()
}

function pause(seconds){
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

async function restartProgram(){
    await pause(2)
    enemyPoints = 0
    playerPoints = 0
}

setup()
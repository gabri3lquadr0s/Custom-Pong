/*Váriaveis relacionadas as paddles*/
var playerY, ctx, enemyY, playerPoints = 0, enemyPoints = 0, playerKey, enemyKey

/*Váriaveis relacionadas a bola*/
var ballY, ballX, ballXOrientation, ballYOrientation

/*Consts das dimensões dos elementos*/
const height=800, width=1200, paddleWidth=20, paddleHeight=200, playerX = 10, enemyX = width - paddleWidth - 10



/*Registro de inputs*/
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

/*Bola*/
function ball(){
    ballYOrientation = ballXOrientation = Math.pow(2, Math.floor(Math.random()*2)+1)-3
    ballX = ballY = width/2-10
}

/*Função de Desenho*/
function drawStuff(x,y,width,height,color=`#fff`){
    ctx.fillStyle = color
    ctx.fillRect(x,y,width,height)
    ctx.fillStyle = "#000"
}

/*Função com a lista de coisas para desenhar na tela*/
function draw(){
    drawStuff(0,0,width,height,`#000`)
    drawStuff(playerX, playerY, paddleWidth, paddleHeight)
    drawStuff(enemyX, enemyY, paddleWidth, paddleHeight)
    drawStuff(ballX, ballY, 10, 10)
    points()
}

/*Sistema do desenho dos pontos*/
function points(){
    ctx.font = `30px monospace`
    ctx.fillStyle = `#fff`
    ctx.fillText(playerPoints, width/4, 50)
    ctx.fillText(enemyPoints, 3*(width/4), 50)
    if(enemyPoints >= 10 /*mudar para maxPoints depois que funcionar*/){
        ctx.font = `50px monospace`
        ctx.fillStyle = `#fff`
        ctx.fillText(`You Lose!`, width/2, 450)
    }
    else if(playerPoints >= 10 /*mudar para maxPoints depois que funcionar*/){
        ctx.font = `50px monospace`
        ctx.fillStyle = `#fff`
        ctx.fillText( `You Win!`, width/2, 450)
    }
}

/*Spawn dos elementos*/
function setup(){
    const canvas = document.getElementById(`canvas`)
    ctx = canvas.getContext(`2d`)
    playerY = enemyY = (height/2)-(paddleHeight/2)
    setInterval(loop,1000/60)
    ball()
    control()
}

/*Lógica da colisão e movimento das paddles e bola*/
function loop(){
    if(ballX >= playerX && ballX <=playerX + 10 && ballY >= playerY && ballY <= playerY + paddleHeight){
        ballXOrientation = 1
        hitAudio.play()
    }
    else if(ballX >= enemyX && ballX <= enemyX + 10 && ballY >= enemyY && ballY <= enemyY + paddleHeight){
        ballXOrientation = -1
        hitAudio.play()
    }
    if(ballY + 10 >= height || ballY <= 0){
        ballYOrientation *=-1
    }

    /*for(var totalPoints = playerPoints + enemyPoints; totalPoints <= 10; ballSpeed++){
        ballX += ballSpeed*ballXOrientation
        ballY += ballSpeed*ballYOrientation
    } kk crachou o live server*/

    //var ballSpeed = document.getElementById('ballSpeed')
    var ballSpeed = 9
    console.log(ballSpeed)
    ballX += ballSpeed*ballXOrientation
    ballY += ballSpeed*ballYOrientation
    
    if(ballX + 10 > width){
        playerPoints++
        console.log(playerPoints, enemyPoints)
        scoreAudio.play()
        if(playerPoints < 10){
            ball()
        }  
    }
    else if(ballX < 0){
        enemyPoints++
        console.log(playerPoints, enemyPoints)
        scoreAudio.play()
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
    if (enemyMiddle < ballY && enemyY + paddleHeight < height) {
        enemyY += 6
    } else if (enemyMiddle > ballY && enemyY > 0) {
        enemyY -= 6
    }
    
    if(enemyPoints >= 10 || playerPoints >= 10 /*mudar para maxPoints depois que funcionar*/){
        restartProgram()
    }
    draw()
}

/*Essas duas funções fazem com que o jogo reinicie após o número limite de pontos*/
function pause(seconds){
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

async function restartProgram(){
    await pause(2)
    enemyPoints = 0
    playerPoints = 0
}

/*Audio*/
var hitAudio = new Audio('sfx/hit.wav')
var scoreAudio = new Audio('sfx/score.wav')

setup()
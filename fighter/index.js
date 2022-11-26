const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7




const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: '/fighter/gameAssets/oak_woods_v1.0/background.jpg'
})

const shop = new Sprite({
    position: {
        x:600,
        y:138
    },
    imageSrc: '/fighter/gameAssets/oak_woods_v1.0/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter({
    position: {
        x:200,
        y:0
    },
    velocity: {
        x:0,
        y:0
    },
    imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Idle.png',
    framesMax :8,
    scale: 2.5,
    offset: {
        x:215,
        y:150
    },
    sprites: {
        idle: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Run.png',
            framesMax: 8,

        },
        jump: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Jump.png',
            framesMax: 2,

        },
        fall: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Fall.png',
            framesMax: 2,

        },
        attack1: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Attack1.png',
            framesMax: 6,

        },
        takeHit: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Take Hit - white silhouette.png',
            framesMax:4
        },
        death: {
            imageSrc:'/fighter/gameAssets/oak_woods_v1.0/samurai/Martial Hero/Sprites/Death.png',
            framesMax:6
        }
    },
    attackBox: {
        offset: {
            x:85,
            y:50
        },
        width:170,
        height:50
    }
})


const enemy = new Fighter({
    position: {
        x:700,
        y:100
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x:-50,
        y:0
    },
    imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Idle.png',
    framesMax :4,
    scale: 2.5,
    offset: {
        x:215,
        y:167
    },
    sprites: {
        idle: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Run.png',
            framesMax: 8,

        },
        jump: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Jump.png',
            framesMax: 2,

        },
        fall: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Fall.png',
            framesMax: 2,

        },
        attack1: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Attack1.png',
            framesMax: 4,

        },
        takeHit: {
            imageSrc: '/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc:'/fighter/gameAssets/oak_woods_v1.0/kenji/Martial Hero 2/Sprites/Death.png',
            framesMax:7
        }
    },
    attackBox: {
        offset: {
            x:-170,
            y:50
        },
        width:170,
        height:50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}



deacreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    // Движение игрока
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprites('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprites('run')
    } else {
        player.switchSprites('idle')
    }

    // прыжок игрока
    if ( player.velocity.y < 0) {
        player.switchSprites('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprites('fall')
    }



     // Движение противника
     enemy.velocity.x = 0
     if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
         enemy.velocity.x = -5
         enemy.switchSprites('run')
     } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
         enemy.velocity.x = 5
         enemy.switchSprites('run')
     } else {
        enemy.switchSprites('idle')
     }
    

     // прыжок противника
     if ( enemy.velocity.y < 0) {
        enemy.switchSprites('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprites('fall')
    }

     // соприкосновение
     if (rectangularCollision({
        rectangle1: player,
        rectangle2:enemy
     })
        && player.isAttacking && player.framesCurrent === 4) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
     }

     if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking == false
     }

     if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
     })
        && enemy.isAttacking && enemy.framesCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
     }

     if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking == false
     }

     // Конец игры по хп
     if (enemy.health <= 0 || player.health<=0){
        determineWinner({player,enemy,timerId})
     }

}

animate()

window.addEventListener('keydown', (event) =>{
    if(!player.dead){
    switch (event.key) {
        // Игрок
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break  
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break  
    }
}
    if(!enemy.dead){
    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break  
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break  
        case 'ArrowUp':
            enemy.velocity.y = -20
            enemy.lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            enemy.attack()
            break 
    }
}
})

window.addEventListener('keyup', (event) =>{
    // Игрок
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break       
    }
    // Противник
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break       
    }
})


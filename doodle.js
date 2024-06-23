export const DEFAULT_DOODLE_WIDTH = 50
export const DEFAULT_DOODLE_HEIGHT = 70
export const DEFAULT_GRAVITY = .5
export const DEFAULT_X_ACCELERATION = 8

export class Doodle {
    constructor(x, y, width, height, color, type, keysManager, gravityPower = DEFAULT_GRAVITY) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.type = type
        this.keysManager = keysManager
        this.gravityPower = gravityPower
        this.velocityY = 0
        this.velocityX = 0
        this.isJumping = false
    }

    init(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(ctx) {
        this.gravity(ctx)
        this.move(ctx)
    }
    
    render(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    gravity(ctx) {
        const { gravityPower } = this

        // if falling down
        if (this.velocityY >= 0) {
            this.isJumping = false
        }

        this.velocityY += gravityPower
        this.y += this.velocityY
    }

    move(ctx) {
        const { keysManager } = this
    
        if (keysManager.isKeyPressed('a') && !keysManager.isKeyPressed('d')) {
            this.velocityX = -DEFAULT_X_ACCELERATION
        }
        if(keysManager.isKeyPressed('d') && !keysManager.isKeyPressed('a')) {
            this.velocityX = DEFAULT_X_ACCELERATION
        }
        if(!keysManager.isKeyPressed('a') && !keysManager.isKeyPressed('d')) {
            this.velocityX = 0
        }

        if (this.x + this.width <= 0) {
            this.x = ctx.canvas.width
        }
        else if (this.x >= ctx.canvas.width) {
            this.x = -this.width
        }
        
        this.x += this.velocityX
    }

    jump() {
        this.velocityY = -14
        this.isJumping = true
    }

    isColliding(otherEntity) {
        return (
            this.x + this.width >= otherEntity.x &&
            otherEntity.x + otherEntity.width >= this.x &&
            this.y + this.height >= otherEntity.y &&
            otherEntity.y + otherEntity.height >= this.y
        );
    }
    colliding(otherEntity) {
        if (otherEntity.type === 'platform') {
            let bottomOfCharacter = this.y + this.height;
            let topOfPlatform = otherEntity.y;

            if (bottomOfCharacter >=  topOfPlatform && bottomOfCharacter <= topOfPlatform + otherEntity.height &&
                this.x < otherEntity.x + otherEntity.width &&
                this.x + this.width > otherEntity.x && !this.isJumping
            ) {
                this.jump()
            }
        }
    }
}   
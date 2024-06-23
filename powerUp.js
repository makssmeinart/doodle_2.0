export const DEFAULT_POWER_UP_WIDTH = 30
export const DEFAULT_POWER_UP_HEIGHT = 30

export class PowerUp {
    constructor( x,y,width,height,color, removeEntity ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.removeEntity = removeEntity
    }

    init(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    update(ctx) {
        
    }
    
    render(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
        if (otherEntity.type === 'player') {
            otherEntity.velocityY = -15
            this.removeEntity(this)
        }
    }
}
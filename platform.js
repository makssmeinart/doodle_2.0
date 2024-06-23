export const DEFAULT_PLATFORM_WIDTH = 150
export const DEFAULT_PLATFORM_HEIGHT = 25

export class Platform {
    constructor(x,y, width, height, color, type,entityManager) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.type = type
        this.entityManager = entityManager
    }

    init(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    update(ctx) {
        if (this.y - this.height > ctx.canvas.height) {
            this.entityManager.removeEntity(this)
        }
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
    }
}
export class Entity {
    constructor(x,y,width,height, color,type) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.type = type
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
}
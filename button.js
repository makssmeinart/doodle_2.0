export class Button {
    constructor(text, x, y,width, height,fontSize,font) {
        this.text = text
        this.x = x 
        this.y = y
        this.width = width
        this.height = height
        this.fontSize = fontSize
        this.font = font
    }

    init = (ctx) => {
        const { text, x, y, width, height, fontSize, font } = this;

        ctx.lineWidth = 5;
        ctx.strokeRect(x, y, width, height);

        ctx.font = `${fontSize}px ${font}`;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textX = x + width / 2;
        const textY = y + height / 2;

        ctx.fillText(text, textX, textY);
    }

    isPointing(mouseX,mouseY) {
        const {x, y, width, height} = this

        return (
            mouseX >= x &&
            mouseX <= x + width &&
            mouseY >= y &&
            mouseY <= y + height
        );
    }

    click() {
        throw Error('Define click action please!')
    }
}
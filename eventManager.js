export class EventManager {
    constructor(canvas, entityManager) {
        this.canvas = canvas;
        this.entityManager = entityManager;
        this.canvas.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const mouseX = event.pageX - this.canvas.offsetLeft;
        const mouseY = event.pageY - this.canvas.offsetTop;

        this.entityManager.getEntities().forEach(entity => {
            if (!entity.isPointing || !entity.isPointing(mouseX, mouseY))  {
                return
            }
            entity.click();
        })
    }
}
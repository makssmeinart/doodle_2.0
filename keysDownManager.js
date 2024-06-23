export class KeysDownManager {
    constructor() {
        this.keysPressed = new Set()
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    }

    handleKeyDown(event) {
        const { key } = event
        this.keysPressed.add(key)
    }

    handleKeyUp(event) {
        const { key } = event
        this.keysPressed.delete(key)
    }

    cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('keyup', this.handleKeyUp)
    }

    isKeyPressed(key) {
        return this.keysPressed.has(key)
    }
}
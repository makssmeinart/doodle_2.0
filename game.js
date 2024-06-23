import { Button } from "./button.js"
import { DEFAULT_DOODLE_HEIGHT, DEFAULT_DOODLE_WIDTH, DEFAULT_GRAVITY, Doodle } from "./doodle.js"
import { Entity } from "./entity.js"
import { EntityManager } from "./entityManager.js"
import { EventManager } from "./eventManager.js"
import { KeysDownManager } from "./keysDownManager.js"
import { DEFAULT_PLATFORM_HEIGHT, DEFAULT_PLATFORM_WIDTH, Platform } from "./platform.js"
import { DEFAULT_POWER_UP_HEIGHT, DEFAULT_POWER_UP_WIDTH, PowerUp } from "./powerUp.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.isLoopRunning = false;
        this.entityManager = new EntityManager();
        this.eventManager = new EventManager(this.canvas, this.entityManager);
        this.keysManager = new KeysDownManager();

        this.init();
    }

    init() {
        if (!this.isLoopRunning) {
            this.openMenu()
            return
        }

        this.startLoop()
    }

    openMenu() {
        this.isLoopRunning = false

        const playButton = new Button('Play', (this.canvas.width / 2) - 60, (this.canvas.height / 2) - 35, 120, 70, "50", "Arial")

        playButton.init(this.ctx)
        playButton.click = this.startLoop.bind(this)
        this.entityManager.addEntity(playButton)
    }

    startLoop() {
        this.isLoopRunning = true
        this.entityManager.setEntities()
        this.clear(this.ctx)

        const doodle = new Doodle((this.canvas.width / 2) - DEFAULT_DOODLE_WIDTH / 2, 350, DEFAULT_DOODLE_WIDTH, DEFAULT_DOODLE_HEIGHT, 'black', 'player', this.keysManager, DEFAULT_GRAVITY)
        doodle.init(this.ctx)
        this.entityManager.addEntity(doodle)

        // First platform should be under our doodle.
        const platform = new Platform((this.canvas.width / 2) - DEFAULT_PLATFORM_WIDTH / 2, (this.canvas.height) - DEFAULT_PLATFORM_HEIGHT - 55, DEFAULT_PLATFORM_WIDTH, DEFAULT_PLATFORM_HEIGHT, 'red', 'platform', this.entityManager)
        platform.init(this.ctx)
        this.entityManager.addEntity(platform)

        const platform2 = new Platform((this.canvas.width / 2) - DEFAULT_PLATFORM_WIDTH / 2, 250, DEFAULT_PLATFORM_WIDTH, DEFAULT_PLATFORM_HEIGHT, 'red', 'platform', this.entityManager)
        platform2.init(this.ctx)
        this.entityManager.addEntity(platform2)

        const powerUp = new PowerUp(100, 200, DEFAULT_POWER_UP_WIDTH, DEFAULT_POWER_UP_HEIGHT, 'orange', this.entityManager.removeEntity)
        powerUp.init(this.ctx)
        this.entityManager.addEntity(powerUp)

        const camera = new Entity(0, 300, this.canvas.width, 5, 'red', 'camera')
        camera.init(this.ctx)
        this.entityManager.addEntity(camera)

        const tick = (time) => {
            // Clear the canvas
            this.clear(this.ctx);
            // Update the state of each entity
            this.entityManager.getEntities().forEach(entity => {
                entity.update(this.ctx)
            });
            // Render each entity
            this.entityManager.getEntities().forEach(entity => {
                entity.render(this.ctx)
            });
            // Check for collisions
            this.entityManager.getEntities().forEach(entity1 => {
                this.entityManager.getEntities().forEach(entity2 => {
                    if (entity1 !== entity2 && entity1.isColliding && entity2.isColliding) {
                        if (entity1.isColliding(entity2)) {
                            entity1.colliding(entity2);
                        }
                    }
                });
            });

            const diff = camera.y - (doodle.y + doodle.height);

            if (diff >= 0) {
                doodle.y += diff;

                this.entityManager.getEntities().forEach(entity => {
                    if (entity.type !== 'player' && entity.type !== 'camera') {
                        entity.y += diff;
                    }
                });
            }

            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick)
    }

    clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
}

new Game(canvas, ctx)

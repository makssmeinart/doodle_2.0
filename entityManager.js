export class EntityManager {
    constructor() {
        this.entities = new Set();
    }

    addEntity(entity) {
        this.entities.add(entity);
    }

    removeEntity = (entity) => {
        this.entities.delete(entity);
    }

    setEntities(entities) {
        this.entities = new Set(entities);
    }

    getEntities() {
        return Array.from(this.entities);
    }
}

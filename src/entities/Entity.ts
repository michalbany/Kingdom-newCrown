export default class Entity {
    // position
    protected x: number
    protected y: number
    
    // movement
    protected baseSpeed: number
    protected currentSpeed: number
    protected direction: number
    protected canSprint: boolean
    protected isMoving: boolean
    protected infiniteSprint: boolean

    // appearance
    protected color: string
    protected height: number
    protected width: number

    // stats
    protected demage: number
    protected health: number
    protected energy: number
    protected energyRegen: number
    protected healthRegen: number

    // timer
    protected timer: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.color = 'black'
        this.height = 30
        this.width = 30
        
        this.baseSpeed = 0
        this.currentSpeed = this.baseSpeed
        this.direction = 0
        this.canSprint = true
        this.isMoving = false
        this.infiniteSprint = false

        this.demage = 0
        this.health = 0
        this.energy = 0
        this.energyRegen = 0
        this.healthRegen = 0


        this.timer = 0
    }

    public walk(direction: number) {
        this.direction = direction
        this.currentSpeed = this.baseSpeed
        this.isMoving = true;
    }

    public stop() {
        this.isMoving = false;
    }

    public sprint() {
        this.isMoving = true
        if (this.ableToSprint) {
            this.currentSpeed = this.baseSpeed * 4
        }
    }

    get ableToSprint(): boolean {
        return this.canSprint && this.energy > 0
    }

    protected move(deltaTime: number) {
        if (this.isMoving) {
            this.x += this.currentSpeed * this.direction * deltaTime
        }

        // while sprinting, decrease energy over time
        if (this.currentSpeed > this.baseSpeed) {
            if (!this.infiniteSprint) {
                this.energy -= 200 * deltaTime
            }
        }
    }

    protected regenerateEnergy(deltaTime: number) {
        this.timer += deltaTime
        if (this.timer >= 1) {
            console.log('3 seconds have passed')
            this.timer = 0
        }
    }

    protected regenerateHealth(deltaTime: number) {
        if (this.health < 100) {
            this.health += Math.round(this.healthRegen * deltaTime)
        }
    }

    public update(deltaTime: number) {
        this.move(deltaTime)
        this.regenerateEnergy(deltaTime)
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
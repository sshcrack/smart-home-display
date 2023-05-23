import { NoiseFunction3D, createNoise3D } from 'simplex-noise';
import { WavyBackgroundProps } from '.';
import { CanvasLayers } from './interface';

export class WavyCanvasManager {
    private config: WavyBackgroundProps;
    private c: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private shadowCanvas: HTMLCanvasElement
    private shadowCtx: CanvasRenderingContext2D

    private resizeListener = () => this.setupVariables()


    private width: number
    private height: number

    private centerX: number
    private centerY: number

    private hypot: number
    private angle: number

    private layers: CanvasLayers[]

    private noise: NoiseFunction3D
    private timestamp = 0

    constructor(canvas: HTMLCanvasElement, config: WavyBackgroundProps) {
        this.config = config;
        this.c = canvas
        this.ctx = canvas.getContext("2d")



        this.shadowCanvas = document.createElement('canvas')
        this.shadowCtx = this.shadowCanvas.getContext('2d')

        this.noise = createNoise3D()


        this.setupVariables();
        this.redraw()

        window.addEventListener("resize", this.resizeListener)
    }


    public getLayers() {
        const layers: CanvasLayers[] = []
        let currColorId = 0

        for (let lid = 0; lid <= this.config.numOfLayers; lid++) {
            //const colorAngle = Math.PI * 2 * (lid / this.config.numOfLayers)

            layers.push({
                id: lid, // used for noise offset
                progress: 1 - (lid / this.config.numOfLayers),
                color: this.config.colorSchema[currColorId]
            })

            currColorId++

            if (currColorId >= this.config.colorSchema.length) {
                currColorId = 0
            }
        }

        return layers
    }

    public setupVariables() {
        console.log("Setting up variables")
        this.shadowCanvas.width = this.width = this.c.clientWidth
        this.shadowCanvas.height = this.height = this.c.clientHeight
        this.centerX = this.width / 2
        this.centerY = this.height / 2
        this.hypot = Math.hypot(this.width, this.height)

        this.angle = Math.PI * 0.25
        this.layers = this.getLayers()
    }


    private drawLayer(ctx: CanvasRenderingContext2D,layer: CanvasLayers) {
        const segmentBaseSize = 10
        const segmentCount = Math.round(this.hypot / segmentBaseSize)
        const segmentSize = this.hypot / segmentCount
        const waveAmplitude = segmentSize * 4
        const noiseZoom = 0.03

        ctx.save()
        ctx.rotate(Math.sin(this.angle))
        ctx.translate(this.centerX, this.centerY)

        ctx.beginPath()
        ctx.moveTo(-this.hypot / 2, this.hypot / 2 - (this.hypot * layer.progress))
        ctx.lineTo(-this.hypot / 2, this.hypot / 2)
        ctx.lineTo(this.hypot / 2, this.hypot / 2)
        ctx.lineTo(this.hypot / 2, this.hypot / 2 - (this.hypot * layer.progress))

        for (let sid = 1; sid <= segmentCount; sid++) {
            const n = this.noise(sid * noiseZoom, sid * noiseZoom, layer.id + this.timestamp)
            const heightOffset = n * waveAmplitude

            ctx.lineTo((this.hypot / 2) - (sid * segmentSize), this.hypot / 2 - (this.hypot * layer.progress) + heightOffset)
        }

        ctx.closePath()
        ctx.fillStyle = layer.color
        ctx.fill()
        ctx.restore()
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.fillStyle = this.config.bgColor
        ctx.fillRect(0, 0, this.width, this.height)
        ctx.restore()

        this.layers.forEach(layer => this.drawLayer(ctx, layer))
    }

    public redraw(time?: number) {
        if (time) {
            let shiftNeeded = false
            this.timestamp = time / 5000
            this.angle += 0.001

            this.layers.forEach(layer => {
                layer.progress += 0.001

                if (layer.progress > 1 + (1 / (this.layers.length - 1))) {
                    layer.progress = 0
                    shiftNeeded = true
                }
            })

            if (shiftNeeded) {
                this.layers.push(this.layers.shift())
            }

            this.draw(this.shadowCtx)
        }

        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.drawImage(this.shadowCanvas, 0, 0)

        window.requestAnimationFrame(this.redraw.bind(this))
    }

    public destroy() {
        window.removeEventListener("resize", this.resizeListener)
    }
}
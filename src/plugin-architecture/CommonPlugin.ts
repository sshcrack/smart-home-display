export abstract class CommonPlugin {
    public readonly id;

    constructor(id: string) {
        this.id = id
    }

    public abstract initialize(): unknown
}
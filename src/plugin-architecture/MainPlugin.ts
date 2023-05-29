import { CommonPlugin } from "./CommonPlugin";

export abstract class MainPlugin extends CommonPlugin {
    constructor(id: string) {
        super(id);
    }
}
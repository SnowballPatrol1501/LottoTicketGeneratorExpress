export class Random {
    constructor() {
    }

    next(max: number = 9999, min: number = 1): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
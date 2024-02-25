export class DistinctCollection<T>
{
    constructor() {
        this.data = [];
    }

    public csv: string;

    public get data(): Array<T> {
        return this.csv ? this.csv.split(",").map(obj => JSON.parse(obj)) : [];
    }

    public set data(value: Array<T>) {
        this.csv = value.length != 0 && value != null ? value.join(",") : "";
    }

    public add(value: T) {
        if (this.data.some(d => d == value)) throw new Error("Element is already in Collection");
        else {
            if(value)
            this.data = [...this.data, value];
        }
    }

    public remove(value: T) {
        this.data = this.data.filter(d => d != value);
    }
}
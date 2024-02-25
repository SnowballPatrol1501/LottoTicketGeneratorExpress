export class LottoTicketListResult {
    public id: number;
    public hasSuperNumber: boolean;
    public countOfBoxes: number;
}

export class LottoTicketDetailResult {
    public id: number;
    public superNumber?: number;
    public showSuperNumber: boolean;
    public ticketBoxes: Array<LottoTicketDetailBoxResult>;
}

export class LottoTicketDetailBoxResult {
    public id: number;
    public get numbers(): number[]{
        return this.numbersCsv ? this.numbersCsv.split(',').map(n => <number>JSON.parse(n)) : [];
    }
    public numbersCsv: string
}
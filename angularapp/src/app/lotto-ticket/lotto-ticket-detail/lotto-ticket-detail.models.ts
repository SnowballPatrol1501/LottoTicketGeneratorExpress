import { LottoTicketDetailBoxResult, LottoTicketDetailResult } from "./lotto-ticket-detail.dtos";

export class LottoTicketDetailModel extends LottoTicketDetailResult {
    constructor(dto: LottoTicketDetailResult) {
        super();
        this.ticketBoxeModels = [];
        return {
            ...dto,
            ticketBoxeModels: dto.ticketBoxes.map(tb => new LottoTicketDetailBoxModel(tb))
        };
    }

    public ticketBoxeModels: LottoTicketDetailBoxModel[];
}

export class LottoTicketDetailBoxModel extends LottoTicketDetailBoxResult {
    constructor(dto: LottoTicketDetailBoxResult) {
        super();
        return { 
            ...dto,
            numbers: dto.numbersCsv.split(',').map(n => JSON.parse(n))
        };
    }

    public numbers: number[] = [];
}
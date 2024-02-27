import { LottoTicketBox } from "./lotto-ticket-box";
import { Random } from "./shared";

export class LottoTicket {
    constructor() {
        this.lottoTicketBoxes = [];
    }

    public id: number;
    public superNumber?: number;
    public showSuperNumber: boolean;
    public countOfBoxes: number;
    public lottoTicketBoxes: LottoTicketBox[];

    public static create(cmd: LottoTicketCreateCommand): LottoTicket {
        const lottoTicket = new LottoTicket();
        for (let i = 1; i <= cmd.numOfBoxes; i++)
            lottoTicket.lottoTicketBoxes.push(LottoTicketBox.create(lottoTicket));
        if (cmd.generateSuperNumber) {
            const rnd = new Random();
            lottoTicket.superNumber = rnd.next(9);
            lottoTicket.showSuperNumber = true;
        }
        lottoTicket.countOfBoxes = lottoTicket.lottoTicketBoxes.length;
        return lottoTicket;
    }
}

export class LottoTicketCreateCommand {
    public numOfBoxes: number;
    public generateSuperNumber: boolean;
}
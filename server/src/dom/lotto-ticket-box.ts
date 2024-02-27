import { LottoTicket } from "./lotto-ticket";
import { DistinctCollection, Random } from "./shared";

export class LottoTicketBox {
    public static numbersPerLottoTicketBox: number = 6;
    public id: number;
    public numbers: DistinctCollection<number>;
    public lottoTicketId: number;

    public static create(lottoTicket: LottoTicket): LottoTicketBox {
        const rnd = new Random();
        const lottoTicketBox = new LottoTicketBox();
        lottoTicketBox.lottoTicketId = lottoTicket.id;
        lottoTicketBox.numbers = new DistinctCollection<number>();
        LottoTicketBox.initNumbers(lottoTicketBox, rnd);
        return lottoTicketBox;
    }

    private static initNumbers(lottoTicketBox: LottoTicketBox, rnd: Random) {
        let possibleNumbers: number[] = [];
        for (let i = 1; i <= 49; i++) possibleNumbers.push(i);
        for (let i = 1; i <= LottoTicketBox.numbersPerLottoTicketBox; i++) {
            const rndIndex = rnd.next(possibleNumbers.length - 1)
            const rndNumber = possibleNumbers[rndIndex];
            lottoTicketBox.numbers.add(rndNumber);
            possibleNumbers = [...possibleNumbers.filter(n => n != rndNumber)];
        }
        if (lottoTicketBox.numbers.data.length != 6)
            throw new Error(JSON.stringify(lottoTicketBox));
    }
}
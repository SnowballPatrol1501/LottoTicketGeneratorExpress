import { LottoTicket } from "./lotto-ticket";
import { DistinctCollection } from "./shared/distinct-collection";
import { Random } from "./shared/random";

export class LottoTicketBox {
    public static numbersPerLottoTicketBox: number = 6;
    public id: number;
    public numbers: DistinctCollection<number>;
    public lottoTicketId: number;

    public static create(lottoTicket: LottoTicket): LottoTicketBox {
        var rnd = new Random();
        var lottoTicketBox = new LottoTicketBox();
        lottoTicketBox.lottoTicketId = lottoTicket.id;
        lottoTicketBox.numbers = new DistinctCollection<number>();
        LottoTicketBox.initNumbers(lottoTicketBox, rnd);
        return lottoTicketBox;
    }

    private static initNumbers(lottoTicketBox: LottoTicketBox, rnd: Random) {
        var possibleNumbers: number[] = [];
        for (var i = 1; i <= 49; i++) possibleNumbers.push(i);
        for (var i = 1; i <= LottoTicketBox.numbersPerLottoTicketBox; i++) {
            var rndN = rnd.next(possibleNumbers.length - 1)
            var rndNumber = possibleNumbers[rndN];
            lottoTicketBox.numbers.add(rndNumber);
            possibleNumbers = [...possibleNumbers.filter(n => n != rndNumber)];
        }
        if (lottoTicketBox.numbers.data.length != 6)
            throw new Error(JSON.stringify(lottoTicketBox));
    }
}
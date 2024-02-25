import { openDb } from "../app";
import { LottoTicketCreateCommand, LottoTicket } from "../dom";

export class LottoTicketService {
    public async createLottoTicket(cmd: CreateLottoTicketCommand): Promise<number> {
        const ticket = LottoTicket.create(cmd);
        const db = await openDb();
        const result = await db.run('INSERT INTO LottoTickets(countOfBoxes, showSuperNumber, superNumber) VALUES (:countOfBoxes, :showSuperNumber, :superNumber)', {
            ':countOfBoxes': ticket.countOfBoxes,
            ':showSuperNumber': ticket.showSuperNumber,
            ':superNumber': ticket.superNumber
        });
        ticket.id = result.lastID;
        for(let lottoTicketBox of ticket.lottoTicketBoxes){
            await db.run(`INSERT INTO LottoTicketBoxes(numbers_csv, lottoTicketId) VALUES ('${lottoTicketBox.numbers.csv}', ${ticket.id})`);
        }
        return ticket.id;
    }
}

export class CreateLottoTicketCommand extends LottoTicketCreateCommand {
}
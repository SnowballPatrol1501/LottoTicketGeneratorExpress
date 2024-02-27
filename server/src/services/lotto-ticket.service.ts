import { openDb } from "../app";
import { LottoTicketCreateCommand, LottoTicket } from "../dom";
import { LottoTicketDetailResult, LottoTicketListResult } from "./dtos/lotto-ticket.service.dtos";

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
        for (let lottoTicketBox of ticket.lottoTicketBoxes) {
            await db.run(`INSERT INTO LottoTicketBoxes(numbers_csv, lottoTicketId) VALUES ('${lottoTicketBox.numbers.csv}', ${ticket.id})`);
        }
        db.close();
        return ticket.id;
    }

    public async loadLottoTicketList() {
        const db = await openDb();
        const list = await db.all<Array<LottoTicketListResult>>(`
            SELECT
              id,
              CASE WHEN superNumber IS NULL THEN false ELSE true END hasSuperNumber,
              countOfBoxes
            FROM LottoTickets
        `);
        db.close();
        return list;
    }

    public async loadLottoTicketDetail(id: any) {
        const db = await openDb();
        const result = await db.get<LottoTicketDetailResult>(`
            SELECT
              id,
              superNumber,
              showSuperNumber
            FROM LottoTickets where id = ?
        `, [id]);
        result.ticketBoxes = await db.all(`
            SELECT
              id,
              numbers_csv AS numbersCsv
            FROM LottoTicketBoxes where lottoTicketId = ?
        `, [result.id]);
        db.close();
        return result;
    }
}

export class CreateLottoTicketCommand extends LottoTicketCreateCommand {
}
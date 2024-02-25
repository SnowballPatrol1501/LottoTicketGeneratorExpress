
import * as express from 'express';
import { LottoTicketDetailResult, LottoTicketListResult } from './dtos.ts/lotto-ticket.dtos';
import { CreateLottoTicketCommand, LottoTicketService } from '../services/lotto-ticket.service';
import { openDb } from '../app';

class LottoTicketController {
  public path = '/LottoTicket';
  public router = express.Router();
  public lottoTicketService = new LottoTicketService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/getLottoTickets', this.getLottoTickets);
    this.router.get(this.path + '/getLottoTicketDetail', this.getLottoTicketDetail);
    this.router.post(this.path + '/createLottoTicket', this.createLottoTicket);
  }

  public getLottoTickets = async (request: express.Request, response: express.Response) => {
    const db = await openDb();
    const list = await db.all<Array<LottoTicketListResult>>(`
        SELECT
          id,
          CASE WHEN superNumber IS NULL THEN false ELSE true END hasSuperNumber,
          countOfBoxes
        FROM LottoTickets
    `);
    db.close();
    response.send(list);
  }

  public createLottoTicket = async (request: express.Request, response: express.Response) => {
    const cmd: CreateLottoTicketCommand = <CreateLottoTicketCommand>request.body;
    response.json(await this.lottoTicketService.createLottoTicket(cmd));
  }

  public getLottoTicketDetail = async (request: express.Request, response: express.Response) => {
    const id = request.query.id;
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
    response.send(result);
  }
}

export default LottoTicketController;
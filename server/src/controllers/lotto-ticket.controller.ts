
import * as express from 'express';
import { CreateLottoTicketCommand, LottoTicketService } from '../services/lotto-ticket.service';

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
    try {
      const list = await this.lottoTicketService.loadLottoTicketList();
      response.send(list);
    } catch (error) {
      console.error(error);
    }
  }

  public createLottoTicket = async (request: express.Request, response: express.Response) => {
    try {
      const cmd: CreateLottoTicketCommand = <CreateLottoTicketCommand>request.body;
      response.json(await this.lottoTicketService.createLottoTicket(cmd));
    } catch (error) {
      console.error(error);
    }
  }

  public getLottoTicketDetail = async (request: express.Request, response: express.Response) => {
    try {
      const id = request.query.id;
      const result = await this.lottoTicketService.loadLottoTicketDetail(id);
      response.send(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default LottoTicketController;
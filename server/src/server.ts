import LottoTicketController from './controllers/lotto-ticket.controller';
import App from './app';

const app = new App(
  [
    new LottoTicketController()
  ],
  5000,
);
 
app.listen();
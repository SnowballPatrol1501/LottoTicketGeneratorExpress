import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Database } from 'sqlite3';
import { open } from 'sqlite';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeCORS();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.checkDbTables();
    this.app.use((req, res, next) => {
      const err = new Error('Not Found');
      next(err);
    });
    
    this.app.use((err, req, res, next) => {
      res.locals.error = err;
      const status = err.status || 500;
      res.status(status);
      res.render('error');
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeCORS() {
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public async checkDbTables() {
    await this.initLottoTicketDbTable();
    await this.initLottoTicketBoxDbTable();
  }

  private async initLottoTicketDbTable() {
    const db = await openDb();
    await db.run(
      `CREATE TABLE IF NOT EXISTS LottoTickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        superNumber INTEGER,
        showSuperNumber BOOLEAN,
        countOfBoxes INTEGER
      )`
    );
    db.close();
  }

  private async initLottoTicketBoxDbTable() {
    const db = await openDb();
    await db.run(
      `CREATE TABLE IF NOT EXISTS LottoTicketBoxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numbers_csv TEXT,
        lottoTicketId INTEGER
      )`
    );
    db.close();
  }
}

export const openDb = async () => await open({
  filename: './db.lottoticketgenerator',
  driver: Database,
});

export default App;
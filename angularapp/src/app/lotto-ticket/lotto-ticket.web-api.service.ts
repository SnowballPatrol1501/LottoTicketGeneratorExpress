import { Injectable } from "@angular/core";
import { WebApiServiceBase } from "../web-api/web-api-base.service";
import { HttpClient } from "@angular/common/http";
import * as Dtos from "./lotto-ticket.dtos";

@Injectable({ providedIn: 'root' })
export class LottoTicketWebApiService extends WebApiServiceBase {
    constructor(httpClient: HttpClient){
        super(httpClient, 'lottoTicket');
    }

    getLottoTickets(){
        return this.get<Dtos.LottoTicketListResult[]>('getLottoTickets');
    }

    getLottoTicketDetail(id: number){
        return this.get<Dtos.LottoTicketDetailResult>('getLottoTicketDetail', { id });
    }

    createLottoTicket(param: CreateLottoTicketCommand){
        return this.post<number>('createLottoTicket', param, true);
    }
}

export class CreateLottoTicketCommand{
    constructor(
        public numOfBoxes: number,
        public generateSuperNumber: boolean
    ){}
}
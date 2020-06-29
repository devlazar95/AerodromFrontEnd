import { IPassenger } from './passengers.model';
import { IFlight } from './flight.model';

export class ITicket{
    number: string;
    passenger: number;
    seatNum: string;
    gateNum: number;
    flight: string;
}
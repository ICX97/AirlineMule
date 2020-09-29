import { Avion } from './avion';
import { Destinacija } from './destinacija';
import { Aviokompanija } from './aviokompanija';
import { Pilot } from './pilot';

export class Let {
    LetID: number;
    DatumPolaska: Date;
    VremePolaska: string;
    Status: string;
    Terminal: string;
    SlobodnoEkoKlasa: number;
    SlobodnoBizKlasa: number;
    AvionID: Avion;
    KompanijaID: Aviokompanija;
    DestinacijaID: Destinacija;
    PilotID: Pilot;

}


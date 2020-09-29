import { Klasa } from './klasa';
import { Putnik } from './putnik';
import { Let } from './let';

export class AvionskaKarta {
    AvionskaKartaID: number;
    CenaKarte: number;
    DatumKupovine: Date;
    CheckIn: boolean;
    BrojSedista: number;
    LetID: Let;
    KlasaID: Klasa;
    PutnikID: Putnik;

}
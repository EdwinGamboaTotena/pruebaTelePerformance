import { Usuario } from './usuario';

export class Turno {
    constructor(
        public fechaInicio: Date,
        public fechaFin: Date,
        public horarioInicioTurno: string,
        public horarioFinTurno: string,
        public horarioInicioHoraExtra: string,
        public horarioFinHoraExtra: string,
        public motivoHoraExtra: string,
        public usuario: Usuario,
    ) { }
}

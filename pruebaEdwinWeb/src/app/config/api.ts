import { environment } from '../../environments/environment';

const {urlPrincipal} = environment;

export const apiUsuario = `${urlPrincipal}/usuario`;
export const apiTurno = `${urlPrincipal}/turno`;
export const apiExterno = `${urlPrincipal}/servicioExterno`;


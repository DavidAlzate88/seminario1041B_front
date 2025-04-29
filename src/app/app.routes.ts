import { Routes } from '@angular/router';
import {ListarTransportistaComponent} from './transportistas/listar-transportista/listar-transportista.component';
import {DespachoComponent} from './despacho/listar/despacho.component';

export const routes: Routes = [
  { path: '', component: ListarTransportistaComponent },
  { path: 'despacho', component: DespachoComponent },
];

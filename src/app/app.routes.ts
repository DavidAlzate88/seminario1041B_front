import { Routes } from '@angular/router';
import {ListarTransportistaComponent} from './components/transportistas/listar-transportista/listar-transportista.component';
import {DespachoComponent} from './components/despacho/listar/despacho.component';

export const routes: Routes = [
  { path: '', component: ListarTransportistaComponent },
  { path: 'transportista', component: ListarTransportistaComponent },
  { path: 'despacho', component: DespachoComponent },
];

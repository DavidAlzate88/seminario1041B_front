import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TestsComponent } from '../tests/tests.component';
import { ListaTransportistaComponent } from './transportista/listar/lista-transportista.component';
import { CrearTransportistaComponent } from './transportista/crear/crear-transportista.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestsComponent },
  { path: 'transportista/list', component: ListaTransportistaComponent },
  { path: 'transportista/create', component: CrearTransportistaComponent },
];

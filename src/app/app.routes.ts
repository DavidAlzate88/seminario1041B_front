import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TestsComponent } from '../tests/tests.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestsComponent },
];

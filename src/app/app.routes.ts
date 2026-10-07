import { Routes } from '@angular/router';
import { Planner } from './planner/planner';

export const routes: Routes = [
  { path: '', component: Planner, title: "Fortune's Weave Planner" },
  { path: '**', redirectTo: '' },
];

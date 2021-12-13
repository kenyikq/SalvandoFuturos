import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './backen/paciente/paciente.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { AccionCallejeraComponent } from './pages/accion-callejera/accion-callejera.component';
import { CasosComponent } from './pages/casos/casos.component';
import { CitaComponent } from './pages/cita/cita.component';
import { EstadisticaComponent } from './pages/estadistica/estadistica.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';



//const isAdmin = (next: any)=> map((user: any) => !!user && 'g5Z5gubaLbaEZLUjQFyOjykkQSE2' === user.uid) ;
const routes: Routes = [
  {path: 'home', component: HomeComponent //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
},
{path: 'reporte', component: CitaComponent },
{path: 'login', component: LoginComponent },
{path: 'paciente', component: PacienteComponent },
{path: 'casos', component: CasosComponent,  },
{path: '',component: HomeComponent},
{path: 'accion-callejera',component: AccionCallejeraComponent},
{path: 'estadistica',component: EstadisticaComponent},
{path: 'registro',component: RegistroComponent},
{path: 'googlemaps',component: GooglemapsComponent},
{path: '**',redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProtegeVistaGuard } from '../app/guard/protege-vista.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)


  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'usuario/agregar',
    loadChildren: () => import('./usuario/agregar/agregar.module').then( m => m.AgregarPageModule),
    canActivate:[ProtegeVistaGuard]
  },
  {
    path: 'usuario/modificar',
    loadChildren: () => import('./usuario/modificar/modificar.module').then( m => m.ModificarPageModule),
    canActivate:[ProtegeVistaGuard]
  },
  {
    path: 'usuario/eliminar',
    loadChildren: () => import('./usuario/eliminar/eliminar.module').then( m => m.EliminarPageModule),
    canActivate:[ProtegeVistaGuard]
  },
  {
    path: 'usuario/listar',
    loadChildren: () => import('./usuario/listar/listar.module').then( m => m.ListarPageModule),
    canActivate:[ProtegeVistaGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

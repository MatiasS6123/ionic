import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
  async onSignOut() {
    try {
      await this.authService.signOut();
      // Puedes redirigir al usuario a la página de inicio de sesión o a cualquier otra página aquí.
      this.router.navigate(['/login'])
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }
}

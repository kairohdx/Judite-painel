import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, success: boolean = true, duration = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
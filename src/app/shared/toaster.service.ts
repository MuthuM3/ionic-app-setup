import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastController: ToastController) { }

  async showError(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duration in milliseconds
      color: 'light',
      cssClass: 'custom-toast-text',
      position: 'bottom',
    });
    await toast.present();
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl: string = environment.API_URL;

  constructor() {}

  getImg(url: string): string {
    return `${this.apiUrl}/${url}`;
  }

  private transformName(word: string) {
    return word?.slice(0, 2).toUpperCase();
  }
  getDefaultAvatar(word: string) {
    return this.transformName(word);
  }
}

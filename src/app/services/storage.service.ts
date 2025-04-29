import { Injectable } from '@angular/core';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private readonly _encryptService: EncryptService
  ) { }

  public saveSessionStorage<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      sessionStorage.setItem(key, this._encryptService.encryptAES(value));
    } else {
      sessionStorage.setItem(key, this._encryptService.encryptAES(JSON.stringify(value)));
    }
  }

  public getSessionStorage<T>(key: string): T {
    const decryptedValue = this._encryptService.decryptAES(sessionStorage.getItem(key) ?? '');

    try {
      const parsedValue = JSON.parse(decryptedValue);

      if (typeof parsedValue === 'object') {
        return parsedValue as T;
      }
    } catch (e) {
      console.error('Error al parsear el valor desencriptado:', e); // Manejo del error
    }

    return decryptedValue as unknown as T;
  }

  public cleanSessionStorage(): void {
    sessionStorage.clear();
  }

  public saveLocalStorage<T>(key: string, value: T): void {

    if (typeof value === 'string') {
      localStorage.setItem(key, this._encryptService.encryptAES(value));
    } else {
      localStorage.setItem(key, this._encryptService.encryptAES(JSON.stringify(value)));
    }
  }

  public getLocalStorage<T>(key: string): T {
    const decryptedValue = this._encryptService.decryptAES(localStorage.getItem(key) ?? '');

    try {
      const parsedValue = JSON.parse(decryptedValue);

      if (typeof parsedValue === 'object') {
        return parsedValue as T;
      }
    } catch (e) {
      console.error('Error al parsear el valor desencriptado:', e); // Manejo del error
    }

    return decryptedValue as unknown as T;
  }

  public cleanLocalStorage(): void {
    localStorage.clear();
  }
}

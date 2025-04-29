import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  // Función para cifrar la información
  public encryptAES(data: string): string {
    return AES.encrypt(data, environment.secretKey).toString();
  }

  // Función para descifrar la información
  public decryptAES(encryptedData: string): string {
    const bytes = AES.decrypt(encryptedData, environment.secretKey);
    return bytes.toString(enc.Utf8);
  }
}

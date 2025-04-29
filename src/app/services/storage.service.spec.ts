import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { EncryptService } from './encrypt.service';

describe('StorageService', () => {
  let service: StorageService;
  let mockEncryptService: jasmine.SpyObj<EncryptService>;

  beforeEach(() => {
    // Crear un mock para el EncryptService
    mockEncryptService = jasmine.createSpyObj('EncryptService', ['encryptAES', 'decryptAES']);

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: EncryptService, useValue: mockEncryptService }
      ]
    });

    service = TestBed.inject(StorageService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('saveLocalStorage', () => {
    it('debería guardar un valor string en localStorage', () => {
      spyOn(localStorage, 'setItem');
      mockEncryptService.encryptAES.and.returnValue('encryptedValue');

      service.saveLocalStorage('key', 'value');

      expect(mockEncryptService.encryptAES).toHaveBeenCalledWith('value');
      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'encryptedValue');
    });

    it('debería guardar un objeto en localStorage', () => {
      spyOn(localStorage, 'setItem');
      mockEncryptService.encryptAES.and.returnValue('encryptedValue');

      const obj = { id: 1, name: 'Test' };
      service.saveLocalStorage('key', obj);

      expect(mockEncryptService.encryptAES).toHaveBeenCalledWith(JSON.stringify(obj));
      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'encryptedValue');
    });
  });

  describe('getLocalStorage', () => {
    it('debería obtener y descifrar un valor string de localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('encryptedValue');
      mockEncryptService.decryptAES.and.returnValue('decryptedValue');

      const result = service.getLocalStorage<string>('key');

      expect(localStorage.getItem).toHaveBeenCalledWith('key');
      expect(mockEncryptService.decryptAES).toHaveBeenCalledWith('encryptedValue');
      expect(result).toBe('decryptedValue');
    });

    it('debería obtener y descifrar un objeto de localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('encryptedValue');
      mockEncryptService.decryptAES.and.returnValue('{"id":1,"name":"Test"}');

      const result = service.getLocalStorage<{ id: number; name: string }>('key');

      expect(localStorage.getItem).toHaveBeenCalledWith('key');
      expect(mockEncryptService.decryptAES).toHaveBeenCalledWith('encryptedValue');
      expect(result).toEqual({ id: 1, name: 'Test' });
    });

    it('debería manejar errores al parsear un valor no válido', () => {
      spyOn(localStorage, 'getItem').and.returnValue('encryptedValue');
      mockEncryptService.decryptAES.and.returnValue('invalidJSON');
      spyOn(console, 'error');

      const result = service.getLocalStorage<any>('key');

      expect(console.error).toHaveBeenCalledWith('Error al parsear el valor desencriptado:', jasmine.any(SyntaxError));
      expect(result).toBe('invalidJSON');
    });
  });

  describe('cleanLocalStorage', () => {
    it('debería limpiar el localStorage', () => {
      spyOn(localStorage, 'clear');

      service.cleanLocalStorage();

      expect(localStorage.clear).toHaveBeenCalled();
    });
  });

  describe('saveSessionStorage', () => {
    it('debería guardar un valor string en sessionStorage', () => {
      spyOn(sessionStorage, 'setItem');
      mockEncryptService.encryptAES.and.returnValue('encryptedValue');

      service.saveSessionStorage('key', 'value');

      expect(mockEncryptService.encryptAES).toHaveBeenCalledWith('value');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('key', 'encryptedValue');
    });

    it('debería guardar un objeto en sessionStorage', () => {
      spyOn(sessionStorage, 'setItem');
      mockEncryptService.encryptAES.and.returnValue('encryptedValue');

      const obj = { id: 1, name: 'Test' };
      service.saveSessionStorage('key', obj);

      expect(mockEncryptService.encryptAES).toHaveBeenCalledWith(JSON.stringify(obj));
      expect(sessionStorage.setItem).toHaveBeenCalledWith('key', 'encryptedValue');
    });
  });

  describe('getSessionStorage', () => {
    it('debería obtener y descifrar un valor string de sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('encryptedValue');
      mockEncryptService.decryptAES.and.returnValue('decryptedValue');

      const result = service.getSessionStorage<string>('key');

      expect(sessionStorage.getItem).toHaveBeenCalledWith('key');
      expect(mockEncryptService.decryptAES).toHaveBeenCalledWith('encryptedValue');
      expect(result).toBe('decryptedValue');
    });

    it('debería obtener y descifrar un objeto de sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('encryptedValue');
      mockEncryptService.decryptAES.and.returnValue('{"id":1,"name":"Test"}');

      const result = service.getSessionStorage<{ id: number; name: string }>('key');

      expect(sessionStorage.getItem).toHaveBeenCalledWith('key');
      expect(mockEncryptService.decryptAES).toHaveBeenCalledWith('encryptedValue');
      expect(result).toEqual({ id: 1, name: 'Test' });
    });
  });

  describe('cleanSessionStorage', () => {
    it('debería limpiar el sessionStorage', () => {
      spyOn(sessionStorage, 'clear');

      service.cleanSessionStorage();

      expect(sessionStorage.clear).toHaveBeenCalled();
    });
  });
});

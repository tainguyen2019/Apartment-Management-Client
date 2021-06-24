/* eslint-disable no-underscore-dangle */
import jwtDecode from 'jwt-decode';
import memoizeOne from 'memoize-one';

import { API_URL } from 'constants/common';
import { Privilege } from 'constants/users';
import {
  ChangePasswordRequestData,
  LoginRequestData,
  LoginResponseData,
} from 'types/auth';
import { isSuccessResponse } from 'utils/common';

import BaseService from './base';
import { encrypt, decrypt } from './crypto';
import storageService from './storage';

class AuthService extends BaseService {
  get storageKey() {
    return this._storageKey;
  }

  constructor(private _storageKey: string) {
    super({ baseURL: API_URL });
  }

  decodeToken = (token: string): AuthData | undefined => {
    try {
      const { role, privileges } = jwtDecode<TokenPayload>(token);
      return {
        role,
        privileges,
        token,
      };
    } catch (error) {
      return undefined;
    }
  };

  getAuthData = (): AuthData | undefined => {
    const encryptedToken = this.getEncryptedToken();

    if (!encryptedToken) return undefined;

    const authData = this.parseEncryptedToken(encryptedToken);

    if (!authData) this.logout();

    return authData;
  };

  isAuthenticated = () => {
    const authData = this.getAuthData();
    return !!authData;
  };

  login = async ({ username, password }: LoginRequestData) => {
    const res = await this.requestData<LoginResponseData>({
      url: '/v1/authentication/login',
      data: { username, password },
      method: 'POST',
    });

    if (isSuccessResponse(res)) {
      const { token, account, staff_id, apartment_id, department_id } =
        res.data;

      if (token) {
        const encryptedToken = encrypt(res.data.token);
        this.setEncryptedToken(encryptedToken);
      }

      storageService.setItem('staff_id', staff_id);
      storageService.setItem('apartment_id', apartment_id);
      storageService.setItem('account_id', account.id);
      storageService.setItem('username', account.username);
      storageService.setItem('department_id', department_id);
    }

    return res;
  };

  logout = () => {
    this.removeEncryptedToken();
  };

  changePassword = (data: ChangePasswordRequestData) => {
    return this.requestData({
      url: '/v1/authentication/change-password',
      data: data,
      method: 'POST',
      shouldNotifySuccess: true,
    });
  };

  parseEncryptedToken = memoizeOne((encryptedToken: string) => {
    try {
      const token = decrypt(encryptedToken);
      const authData = this.decodeToken(token);
      if (authData) return authData;
    } catch {
      // Do nothing
    }
    return undefined;
  });

  private getEncryptedToken() {
    return storageService.getItem<string>(this._storageKey);
  }

  private removeEncryptedToken() {
    return storageService.removeItem(this._storageKey);
  }

  private setEncryptedToken(token: string) {
    storageService.setItem(this._storageKey, token);
  }
}

const authService = new AuthService('as');

export default authService;

export interface AuthData {
  role: string;
  privileges: Privilege[];
  token: string;
}

interface TokenPayload {
  exp: number;
  role: string;
  privileges: Privilege[];
}

import User from '../models/User';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class AuthService {

  users: User[] = [];
  private currentUser: User = null;

  constructor() {
    this.init();
  }

  init() {
    this.users = [
      { id: 'user1', name: 'User 1', token: 'usr1tok'},
      { id: 'user2', name: 'User 2', token: 'usr2tok'},
      { id: 'user3', name: 'User 3', token: 'usr3tok'}
    ];

    this.currentUser = this.users[0];
    console.log('Auth initialized');
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public getUsers() {
    return this.users;
  }
}

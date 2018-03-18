import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import File from './models/File';
import User from './models/User';
import {AuthService} from './services/auth';
import {FilesService} from './services/files';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  allUsers: User[] = [];
  currentUser: User = null;

  visibleFiles$: Promise<File[]> = null;

  constructor(public auth: AuthService, public files: FilesService) {
  }

  ngOnInit(): void {
    this.allUsers = this.auth.getUsers();
    this.currentUser = this.auth.getCurrentUser();
    this.visibleFiles$ = this.files.getVisibleFiles(this.currentUser);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['currentUser']) {
  //
  //     console.log('changes: visibleFiles');
  //   }
  // }

  onSelectUser(user: User) {
    this.currentUser = user;
    this.auth.setCurrentUser(user);
    this.visibleFiles$ = this.files.getVisibleFiles(this.currentUser);
    console.log('changes: visibleFiles');
  }

  onClickUploadFile() {
    console.log('onClickUploadFile');
  }

  onDeleteFile(file: File) {
    console.log('onDeleteFile', file.id);
  }


  onClickSetPublic(file: File, isPublic: boolean) {
    console.log('onClickSetPublic', file.id, isPublic);

  }

  onClickTogglePublic(file: File) {
    file.isPublic = !file.isPublic;
    console.log('onClickTogglePublic', file.isPublic);
  }

  onDownloadFile(file: File) {
    console.log('onDownloadFile', file.id);
    this.files.downloadFile(file);
  }

  onClickDownloadPrivateFile() {
    console.log('onClickDownloadPrivateFile');
    // Open prompt here

  }

  getFileStyle(file: File) {
    // console.log(`getFontStyle. file.owner=${file.ownerUserId} current=${this.currentUser.id}`);
    return {
      'color': file.deletionDate ? 'lightgray' : 'black',
      'font-weight': file.ownerUserId === this.currentUser.id ? 800 : 100
    };
  }
}

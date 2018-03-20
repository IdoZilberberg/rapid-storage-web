import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import FileEntry from './models/FileEntry';
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
  selectedFileToUpload: File = null;

  visibleFiles: FileEntry[] = [];

  manualUserToken = '';
  manualFileId = '';
  manualUrlDownload = '';
  errMessage = '';

  constructor(public auth: AuthService, public files: FilesService) {
  }

  ngOnInit(): void {
    this.allUsers = this.auth.getUsers();
    this.currentUser = this.auth.getCurrentUser();
    this.files.reloadVisibleFiles(this.currentUser)
      .then(files => {
        this.visibleFiles = files;
      });
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
    this.files.reloadVisibleFiles(this.currentUser)
      .then(files => {
        this.visibleFiles = files;
      });
    console.log('changes: visibleFiles');
  }


  onDeleteFile(fileEntry: FileEntry) {
    console.log('onDeleteFile', fileEntry.id);
    return this.files.setFileDeleted(fileEntry)
      .then(() => {
        this.files.reloadVisibleFiles(this.currentUser)
          .then(files => {
            this.visibleFiles = files;
          });
      });
  }


  onClickTogglePublic(fileEntry: FileEntry) {
    // fileEntry.isPublic = !fileEntry.isPublic;
    console.log('onClickTogglePublic, now is: ', fileEntry.isPublic);

    return this.files.setFilePublicFlag(fileEntry, !fileEntry.isPublic)
      .then(() => {
        this.files.reloadVisibleFiles(this.currentUser)
          .then(files => {
            this.visibleFiles = files;
          });

      });

  }

  // onDownloadFile(file: FileEntry) {
  //   console.log('onDownloadFile', file.id);
  //
  //   this.files.downloadFileFromStorage(file);
  // }

  onClickDownloadPrivateFile() {
    console.log('onClickDownloadPrivateFile', this.manualFileId);

    this.files.getFileMetadata(this.manualUserToken, this.manualFileId)
      .then((fileEntries: FileEntry[]) => {
        fileEntries = fileEntries || [];
        console.log(fileEntries);
        if (fileEntries.length > 0) {
          this.manualUrlDownload = fileEntries[0].downloadURL;
        }
        // return this.files.downloadFileFromStorage(fileEntry);
      })
      .catch(error => {
        console.log(error);
        this.errMessage = error.message;
        setTimeout(() => { this.errMessage = ''; }, 3000);
      });

    // Open prompt here

  }

  getFileStyle(file: FileEntry) {
    // console.log(`getFontStyle. file.owner=${file.ownerUserId} current=${this.currentUser.id}`);
    return {
      'color': file.deletionDate ? 'lightgray' : 'black',
      'font-weight': file.ownerUserId === this.currentUser.id ? 800 : 100
    };
  }

  // Uses File API, see https://developer.mozilla.org/en-US/docs/Web/API/File
  onUploadFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFileToUpload = event.target.files[0];
    }
  }

  // See http://www.angulartutorial.net/2018/01/file-upload-and-send-data-to-backend.html
  onClickUploadFile() {
    console.log('onClickUploadFile', this.selectedFileToUpload);
    const fData: FormData = new FormData;
    fData.append('file[]', this.selectedFileToUpload);
    const newFileMetadata = <FileEntry>{
      fileId: this.files.generatePrivateFileId(),
      ownerUserId: this.currentUser.id,
      path: '/',
      name: this.selectedFileToUpload.name,
      size: this.selectedFileToUpload.size,
      isPublic: true,
      modificationDate: new Date(this.selectedFileToUpload['lastModified']).toISOString(),
      deletionDate: null
    };

    this.files.uploadFileToStorage(this.selectedFileToUpload, newFileMetadata)
      .then(response => {
        this.files.reloadVisibleFiles(this.currentUser)
          .then(files => {
            this.visibleFiles = files;
          });

      });
    // fData.append('data', JSON.stringify(newFileMetadata));
    // this.files.postFileMetadata(this.currentUser.token, newFileMetadata)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // this.files.uploadFile(fData)
    //   .subscribe(
    //     response => {
    //       console.log('set any success actions...');
    //       return response;
    //     },
    //     error => {
    //       console.log('set any error actions...');
    //     }
    //   );
  }

}

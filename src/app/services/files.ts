import User from '../models/User';
import FileEntry from '../models/FileEntry';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {URLS} from './constants';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorageModule} from 'angularfire2/storage';

import * as firebase from 'firebase';

@Injectable()
export class FilesService {

  allFiles: FileEntry[] = [];
  // new FileEntry('1', '1111', 'user1', '/docs', 'file1.doc', 1000, true, '2018-01-01T12:23:34.456Z', null),
  // new FileEntry('2', '2222', 'user1', '/docs', 'file2.doc', 1010, false, '2018-02-02T12:23:34.456Z', null),
  // new FileEntry('3', '3333', 'user2', '/docs', 'file1.doc', 1000, true, '2018-01-01T12:23:34.456Z', null),
  // new FileEntry('4', '4444', 'user3', '/photos', 'sunset.jpg', 21000, true, '2018-01-01T10:00:00.000Z', null),
  // new FileEntry('5', '5555', 'user3', '/photos', 'sunset.jpg', 21000, true, '2018-01-01T10:00:00.000Z', '2018-02-01T10:00:00.000Z')
  // ];


  generatePrivateFileId() {
    let text = '';
    const possible = '0123456789ABCDEF';
    for (let i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  constructor(private http: HttpClient, private storage: AngularFireStorageModule) {

    const config = {
      apiKey: 'AIzaSyADEXtdVTg-Ke4XnoKQ2_4aGGdbMZ3SrU0',
      authDomain: 'rapid-storage.firebaseapp.com',
      databaseURL: 'https://rapid-storage.firebaseio.com',
      projectId: 'rapid-storage',
      storageBucket: 'gs://rapid-storage-db.appspot.com/',
      messagingSenderId: '243864100827'
    };

    firebase.initializeApp(config);

  }

  public setFilePublicFlag(fileEntry: FileEntry, newPublicFlag: boolean) {
    return this.http.put(`${URLS.BASE}/${fileEntry.fileId}?public=${newPublicFlag}`, null).toPromise();
  }

  public setFileDeleted(fileEntry: FileEntry) {
    return this.http.delete(`${URLS.BASE}/${fileEntry.fileId}`).toPromise();
  }


  reloadVisibleFiles(currentUser: User): Promise<FileEntry[]> {

    return this.http.get(`${URLS.BASE}/allfiles`).toPromise()
      .then(response => {
        _.forEach(response, file => {
          file.isPublic = file.isPublic === 'true';
        });
        this.allFiles = _.map(response);
        const visibleFiles = _.filter(this.allFiles, (file: FileEntry) => file.isPublic || file.ownerUserId === currentUser.id);
        return visibleFiles;
      });
  }

  /**
   * Upload file contents to storage
   * @returns {Observable<Object>}
   * @param file
   * @param fileEntry
   */
  uploadFileToStorage(file: any, fileEntry: FileEntry) {

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(fileEntry.path + fileEntry.name);

    return fileRef.put(file)
      .then(snapshot => {
        console.log('Uploaded a blob or file!', snapshot);
        fileEntry.downloadURL = snapshot.downloadURL;
        const url = URLS.BASE;
        return this.http.post(url, fileEntry).toPromise();
      })
      .then(response => {
        console.log('UPLOAD Response from server', JSON.stringify(response));
        this.allFiles.push(response);
        return response;
      })
      .catch(error => {
        console.log('Error in upload', error.message);
      });


    // Call storage directly

    // const url = `${URLS.BASE}/uploadFile`;
    // return this.http.post(url, fileEntry);

  }

  /**
   *
   */
  downloadFileFromStorage(fileEntry: FileEntry) {


  }

  // downloadFile(token: string, file: FileEntry): Observable<Blob> {
  //
  //   const downloadURL = `${URLS.BASE}/${file.path}/${file.name}`;
  //   const options = {
  //     responseType: 'blob',
  //   };
  //
  //   const httpOptions = {
  //     responseType: 'blob',
  //     headers: new HttpHeaders({
  //       'X-AUTH':  token
  //     })
  //   };
  //
  //
  //   return this.http.get(downloadURL, httpOptions);
  // }


  /**
   * Add File metadata to DB (not the file content)
   * @param {string} token
   * @param {FileEntry} fileEntry
   * @returns {Observable<Object>}
   */
  postFileMetadata(token: string, fileEntry: FileEntry) {
    const url = `${URLS.BASE}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'X-AUTH': token
      })
    };
    return this.http.post(url, fileEntry, httpOptions).toPromise();
  }

  getFileMetadata(token: string, fileId: string) {
    const url = `${URLS.BASE}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'X-AUTH': token
      }),
      params: new HttpParams().set('fileid', fileId)
    };
    return this.http.get(url, httpOptions).toPromise();
  }
}

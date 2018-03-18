import User from '../models/User';
import File from '../models/File';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class FilesService {

  allFiles = [
    new File('1', '1111', 'user1', '/docs', 'file1.doc', 1000, true, '2018-01-01T12:23:34.456Z', null),
    new File('2', '2222', 'user1', '/docs', 'file2.doc', 1010, false, '2018-02-02T12:23:34.456Z', null),
    new File('3', '3333', 'user2', '/docs', 'file1.doc', 1000, true, '2018-01-01T12:23:34.456Z', null),
    new File('4', '4444', 'user3', '/photos', 'sunset.jpg', 21000, true, '2018-01-01T10:00:00.000Z', null),
    new File('5', '5555', 'user3', '/photos', 'sunset.jpg', 21000, true, '2018-01-01T10:00:00.000Z', '2018-02-01T10:00:00.000Z')
  ];


  public setPublic(fileId: string, isPublic: boolean) {

  }


  getVisibleFiles(currentUser: User): Promise<File[]> {
    const visibleFiles = _.filter(this.allFiles, (file: File) => file.isPublic || file.ownerUserId === currentUser.id);
    return Promise.resolve(visibleFiles);
  }

  downloadFile(file: File) {

  }
}

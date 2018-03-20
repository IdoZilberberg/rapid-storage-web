export default class FileEntry {
  id?: string;
  fileId?: string;
  ownerUserId: string;
  path: string;
  name: string;
  size: number;
  isPublic: boolean;
  modificationDate?: string;
  deletionDate?: string;
  downloadURL?: string;


  constructor(id: string, privateFileId: string, ownerUserId: string, path: string, name: string, size: number, isPublic: boolean, modificationDate: string, deletionDate: string) {
    this.id = id;
    this.fileId = privateFileId;
    this.ownerUserId = ownerUserId;
    this.path = path;
    this.name = name;
    this.size = size;
    this.isPublic = isPublic;
    this.modificationDate = modificationDate;
    this.deletionDate = deletionDate;
  }
}

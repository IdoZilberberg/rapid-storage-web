export default class File {
  id: string;
  privateFileId: string;
  ownerUserId: string;
  path: string;
  name: string;
  size: number;
  isPublic: boolean;
  modificationDate: string;
  deletionDate: string;


  constructor(id: string, privateFileId: string, ownerUserId: string, path: string, name: string, size: number, isPublic: boolean, modificationDate: string, deletionDate: string) {
    this.id = id;
    this.privateFileId = privateFileId;
    this.ownerUserId = ownerUserId;
    this.path = path;
    this.name = name;
    this.size = size;
    this.isPublic = isPublic;
    this.modificationDate = modificationDate;
    this.deletionDate = deletionDate;
  }
}

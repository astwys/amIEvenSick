import { Collection, Model } from 'mobx-rest'

class FilesModel extends Model { }
export class FilesCollection extends Collection {
    url() { return '/users' }
    model() { return FilesModel }
}

export default new FilesCollection()

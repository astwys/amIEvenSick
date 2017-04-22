import { Collection, Model } from 'mobx-rest'

class SicknessesModel extends Model { }
export class SicknessesCollection extends Collection {
    url() { return '/users' }
    model() { return SicknessesModel }
}

export default new SicknessesCollection()

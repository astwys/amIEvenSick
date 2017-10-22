import { Collection } from 'mobx-rest'
import SicknessesModel from '../models/sickness'

export class SicknessesCollection extends Collection {
    url() { return '/users' }
    model() { return SicknessesModel }
}

export default new SicknessesCollection()

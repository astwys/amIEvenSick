import { Collection } from 'mobx-rest'
import SymptomsModel from '../models/symptom'

export class SymptomsCollection extends Collection {
	url() { return '/todos' }
	model() { return SymptomsModel }
}

export default new SymptomsCollection()
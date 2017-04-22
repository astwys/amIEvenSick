import { Collection } from 'mobx-rest'
import SymptompsModel from '../models/symptomp'

export class SymptompsCollection extends Collection {
	url() { return '/todos' }
	model() { return SymptompsModel }
}

export default new SymptompsCollection()
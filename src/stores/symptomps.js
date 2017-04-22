import { Collection, Model } from 'mobx-rest'

class SymptompsModel extends Model { }
export class SymptompsCollection extends Collection {
	url() { return '/todos' }
	model() { return SymptompsModel }
}

export default new SymptompsCollection()
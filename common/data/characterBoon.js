import Utility from '@thzero/library/utility';

class CharacterBoon {
	constructor() {
		this.id = Utility.generateId();
		this.boonId = null;
		this.locationId = null;
		this.timestamp = null;
	}
}

export default CharacterBoon;

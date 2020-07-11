import NamedData from '@thzero/library/data/named';

class GameSystemData extends NamedData {
	constructor() {
		super();

		this.description = null;
		this.gameSystemId = null;
		this.url = null;
	}

	map(requested) {
		if (!requested)
			return;

		this.description = requested.description;
		this.gameSystemId = requested.gameSystemId;
		this.name = requested.name;
		this.url = requested.url;
	}
}

export default GameSystemData;

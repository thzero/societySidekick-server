import Service from '@thzero/library/service/index';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

class BaseGameSystemService extends Service {
	determineCharactersService() {
		return null;
	}

	determineCharactersValidation(type) {
		throw new NotImplementedError();
	}

	determineScenariosService() {
		throw new NotImplementedError();
	}

	determineScenariosValidation(type) {
		throw new NotImplementedError();
	}

	determineValidation(type) {
		throw new NotImplementedError();
	}
}

export default BaseGameSystemService;

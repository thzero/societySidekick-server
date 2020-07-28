import BaseGameSystemsService from './index';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

class BaseGameSystemGameSystemsService extends BaseGameSystemsService {
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

export default BaseGameSystemGameSystemsService;

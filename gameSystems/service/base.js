import BaseGameSystemsService from './index.js';

import NotImplementedError from '@thzero/library_common/errors/notImplemented.js';

class BaseGameSystemGameSystemsService extends BaseGameSystemsService {
	determineCharactersService(correlationId) {
		return null;
	}

	determineCharactersValidation(correlationId, type) {
		throw new NotImplementedError();
	}

	determineScenariosService(correlationId) {
		throw new NotImplementedError();
	}

	determineScenariosValidation(correlationId, type) {
		throw new NotImplementedError();
	}

	determineValidation(correlationId, type) {
		throw new NotImplementedError();
	}
}

export default BaseGameSystemGameSystemsService;

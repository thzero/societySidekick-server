import LibraryConstants from '@thzero/library/constants';

import injector from '@thzero/library/utility/injector';

class Repository {
	constructor() {
	}

	get _config() {
		return this._injector.getService(LibraryConstants.InjectorKeys.CONFIG)
	}

	get _injector() {
		return injector;
	}

	get _logger() {
		return this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_LOGGER)
	}
}

export default Repository;

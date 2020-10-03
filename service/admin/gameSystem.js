import Constants from '../../constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented'

import BaseAdminService from '@thzero/library_server/service/admin/index';

class GameSystemAdminService extends BaseAdminService {
	constructor() {
		super();

		this._serviceGameSystemsUtility = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceGameSystemsUtility = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY);
	}

	_validateCreate(correlationId, requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('GameSystemAdminService', '_validateCreate', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.validateByGameSystemId(correlationId, requestedValue.gameSystemId, requestedValue, this._validateCreateI, params);
	}

	_validateUpdate(correlationId, requestedValue, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('GameSystemAdminService', '_validateUpdate', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.validateByGameSystemId(correlationId, requestedValue.gameSystemId, requestedValue, this._validateUpdateI, params);
	}

	get _validateCreateI() {
		return new NotImplementedError();
	}

	get _validateUpdateI() {
		return new NotImplementedError();
	}
}

export default GameSystemAdminService;

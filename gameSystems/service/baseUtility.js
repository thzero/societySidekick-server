import Service from '@thzero/library_server/service/index';

class BaseGameSystemsUtilityService extends Service {
	validateByGameSystemId(gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error();

		const serviceResponse = this._getServiceByGameSystemId(gameSystemId);
		if (!serviceResponse.success)
			return serviceResponse;

		const schema = serviceResponse.results.determineValidation(type)
		if (!schema)
			return this._error(`Invalid validation for gamesystem '${gameSystemId}'.`);

		return this._serviceValidation.check(schema, value, params, 'characters');
	}
}

export default BaseGameSystemsUtilityService;

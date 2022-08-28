import Constants from '../../constants.js';
import SharedConstants from '../../common/constants.js';

import Service from '@thzero/library_server/service/index.js';

class UtilityGameSystemsService extends Service {
	characterByGameSystemId(correlationId, gameSystemId) {
		const serviceResponse = this._getServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const determineResponse = serviceResponse.results.determineCharactersService(correlationId);
		if (this._hasFailed(determineResponse))
			return this._error('UtilityGameSystemsService', 'characterByGameSystemId', `Invalid character service for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);

		return determineResponse;
	}

	characterValidateByGameSystemId(correlationId, gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error('UtilityGameSystemsService', 'characterValidateByGameSystemId', null, null, null, null, correlationId);

		const serviceResponse = this._getServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const schema = serviceResponse.results.determineCharactersValidation(correlationId, type)
		if (!schema)
			return this._error('UtilityGameSystemsService', 'characterValidateByGameSystemId', `Invalid character validation for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);

		return this._serviceValidation.check(correlationId, schema, value, params, 'characters');
	}

	scenarioByGameSystemId(correlationId, gameSystemId) {
		const serviceResponse = this._getServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const determineResponse = serviceResponse.results.determineScenariosService(correlationId);
		if (this._hasFailed(determineResponse))
			return this._error('UtilityGameSystemsService', 'scenarioByGameSystemId', `Invalid scenario service for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);

		return determineResponse;
	}

	scenarioValidateByGameSystemId(correlationId, gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error('UtilityGameSystemsService', 'scenarioValidateByGameSystemId', null, null, null, null, correlationId);

		const serviceResponse = this._getServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const schema = serviceResponse.results.determineScenariosValidation(correlationId, type);
		if (!schema)
			return this._error('UtilityGameSystemsService', 'scenarioValidateByGameSystemId', `Invalid scenario validation for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);

		return this._serviceValidation.check(correlationId, schema, value, params, 'scenarios');
	}

	validateByGameSystemId(correlationId, gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error('UtilityGameSystemsService', 'validateByGameSystemId', null, null, null, null, correlationId);

		const serviceResponse = this._getServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const schema = serviceResponse.results.determineValidation(correlationId, type)
		if (!schema)
			return this._error('UtilityGameSystemsService', 'validateByGameSystemId', `Invalid validation for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);

		return this._serviceValidation.check(correlationId, schema, value, params, 'characters');
	}

	_getServiceByGameSystemId(correlationId, gameSystemId) {
		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		// GameSystems Update
		let service = null;
		switch (gameSystemId) {
			case SharedConstants.GameSystems.Pathfinder2e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
				break;
			case SharedConstants.GameSystems.Starfinder1e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
				break;
		}

		return service ? this._successResponse(service, correlationId) : this._error('UtilityGameSystemsService', '_getServiceByGameSystemId', `Invalid service for gamesystem '${gameSystemId}'.`, null, null, null, correlationId);
	}
}

export default UtilityGameSystemsService;

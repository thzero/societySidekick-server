import Constants from '../../constants';
import SharedConstants from '../../common/constants';

import BaseGameSystemsUtilityService from './baseUtility';

class GameSystemsUtilityService extends BaseGameSystemsUtilityService {
	characterByGameSystemId(gameSystemId) {
		const serviceResponse = this._getServiceByGameSystemId(gameSystemId);
		if (!serviceResponse.success)
			return serviceResponse;

		const determineResponse = serviceResponse.results.determineCharactersService()
		if (!determineResponse.success)
			return this._error(`Invalid character service for gamesystem '${gameSystemId}'.`);

		return determineResponse;
	}

	characterValidateByGameSystemId(gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error();

		const serviceResponse = this._getServiceByGameSystemId(gameSystemId);
		if (!serviceResponse.success)
			return serviceResponse;

		const schema = serviceResponse.results.determineCharactersValidation(type)
		if (!schema)
			return this._error(`Invalid character validation for gamesystem '${gameSystemId}'.`);

		return this._serviceValidation.check(schema, value, params, 'characters');
	}

	scenarioByGameSystemId(gameSystemId) {
		const serviceResponse = this._getServiceByGameSystemId(gameSystemId);
		if (!serviceResponse.success)
			return serviceResponse;

		const determineResponse = serviceResponse.results.determineScenariosService();
		if (!determineResponse.success)
			return this._error(`Invalid scenario service for gamesystem '${gameSystemId}'.`);

		return determineResponse;
	}

	scenarioValidateByGameSystemId(gameSystemId, value, type, params) {
		if (!gameSystemId || !value || !type)
			return this._error();

		const serviceResponse = this._getServiceByGameSystemId(gameSystemId);
		if (!serviceResponse.success)
			return serviceResponse;

		const schema = serviceResponse.results.determineScenariosValidation(type);
		if (!schema)
			return this._error(`Invalid scenario validation for gamesystem '${gameSystemId}'.`);

		return this._serviceValidation.check(schema, value, params, 'scenarios');
	}

	_getServiceByGameSystemId(gameSystemId) {
		const validationGameSystemIdResponse = this._validateId(gameSystemId, 'gameSystemId');
		if (!validationGameSystemIdResponse.success)
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

		return service ? this._successResponse(service) : this._error(`Invalid service for gamesystem '${gameSystemId}'.`);
	}
}

export default GameSystemsUtilityService;

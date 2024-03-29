import Constants from '../constants.js';
import SharedConstants from '../common/constants.js';

import LibraryUtility from '@thzero/library_common/utility/index.js';

import Service from '@thzero/library_server/service/index.js';

import ScenarioResult from '../common/data/scenarioResult.js';

class ScenariosService extends Service {
	constructor() {
		super();

		this._repositoryScenarios = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryScenarios = this._injector.getService(Constants.InjectorKeys.REPOSITORY_SCENARIOS);

		this._serviceGameSystemsUtility = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY);
	}

	async listing(correlationId, gameSystemId) {
		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryScenarios.listing(correlationId, gameSystemId);
		return respositoryResponse;
	}

	async playedScenarios(correlationId, user, characterId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		const respositoryFetchResponse = await service.fetch(correlationId, user, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('ScenariosService', 'playedScenarios', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;

		const respositoryScenarioListingResponse = await service.listing(correlationId, user);
		if (this._hasFailed(respositoryScenarioListingResponse))
			return respositoryScenarioListingResponse;

		const respositoryCharacterListingResponse = await this.listing(correlationId, character.gameSystemId);
		if (this._hasFailed(respositoryCharacterListingResponse))
			return respositoryCharacterListingResponse;

		const scenarios = respositoryCharacterListingResponse.results.data;
		const characters = respositoryScenarioListingResponse.results.data;

		const response = this._initResponse(correlationId);
		response.results = [];

		const serviceGameSystemResponse = this._scenarioServiceByGameSystemId(correlationId, character.gameSystemId);
		if (this._hasFailed(serviceGameSystemResponse))
			return serviceGameSystemResponse;
		const serviceGameSystem = serviceGameSystemResponse.results;

		let characterScenario;
		let scenario;
		let scenarioResult;
		for (const characterI of characters) {
			for (characterScenario of characterI.scenarios) {
				scenarioResult = this._initValidScenarioResponse();
				scenarioResult.characterId = characterI.id;
				scenarioResult.characterName = characterI.name;
				scenarioResult.characterNumber = characterI.number;
				scenarioResult.scenarioId = characterScenario.scenarioId;
				scenarioResult.timestamp = characterScenario.timestamp;
				scenario = scenarios.find(l => l.id === characterScenario.scenarioId);
				if (scenario) {
					scenarioResult.repeatable = scenario.repeatable;
					serviceGameSystem.iniializeResult(scenarioResult, scenario, characterScenario);
				}
				response.results.push(scenarioResult);
			}
		}

		response.results = LibraryUtility.sortByTimestamp(response.results, true);
		return response;
	}

	_scenarioServiceByGameSystemId(correlationId, gameSystemId) {
		if (!gameSystemId || !this._serviceGameSystemsUtility)
			return this._error('ScenariosService', '_scenarioServiceByGameSystemId', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.scenarioByGameSystemId(correlationId, gameSystemId);
	}

	_initValidScenarioResponse() {
		return new ScenarioResult();
	}
}

export default ScenariosService;

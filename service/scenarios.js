import Constants from '../constants';
import SharedConstants from '../common/constants';

import Utility from '@thzero/library/utility';

import Service from '@thzero/library/service/index';

import ScenarioResult from '../common/data/scenarioResult';

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
		const validationGameSystemIdResponse = this._validateId(gameSystemId, 'gameSystemId');
		if (!validationGameSystemIdResponse.success)
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryScenarios.listing(correlationId, gameSystemId);
		if (!respositoryResponse.success)
			return this._errorResponse(respositoryResponse);

		return this._initResponse(respositoryResponse);
	}

	async playedScenarios(correlationId, user, characterId) {
		const validationResponse = this._validateUser(user);
		if (!validationResponse.success)
			return this._errorResponse(validationResponse);

		const validationCharacterIdResponse = this._validateId(characterId, 'characters');
		if (!validationCharacterIdResponse.success)
			return this._errorResponse(validationCharacterIdResponse);

		const service = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		const respositoryFetchResponse = await service.fetch(correlationId, user, characterId);
		if (!respositoryFetchResponse.success)
			// TODO: Security - Needs a real security check
			return this._error().addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;

		const respositoryScenarioListingResponse = await service.listing(correlationId, user);
		if (!respositoryScenarioListingResponse.success)
			return this._errorResponse(respositoryScenarioListingResponse);

		const respositoryCharacterListingResponse = await this.listing(correlationId, character.gameSystemId);
		if (!respositoryCharacterListingResponse.success)
			return this._errorResponse(respositoryCharacterListingResponse);

		const scenarios = respositoryCharacterListingResponse.results.data;
		const characters = respositoryScenarioListingResponse.results.data;

		const response = this._initResponse();
		response.results = [];

		const serviceGameSystemResponse = this._scenarioServiceByGameSystemId(character.gameSystemId);
		if (!serviceGameSystemResponse.success)
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

		response.results = Utility.sortByTimestamp(response.results, true);
		return response;
	}

	_scenarioServiceByGameSystemId(gameSystemId) {
		if (!gameSystemId || !this._serviceGameSystemsUtility)
			return this._error();

		return this._serviceGameSystemsUtility.scenarioByGameSystemId(gameSystemId);
	}

	_initValidScenarioResponse() {
		return new ScenarioResult();
	}
}

export default ScenariosService;

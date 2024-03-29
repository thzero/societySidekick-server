import Constants from '../constants.js';
import LibraryConstants from '@thzero/library_server/constants.js';
import SharedConstants from '../common/constants.js';

import LibraryUtility from '@thzero/library_common/utility/index.js';

import Service from '@thzero/library_server/service/index.js';

import ScenarioResult from '../common/data/scenarioResult.js';

class CharactersService extends Service {
	constructor() {
		super();

		this._repositoryCharacters = null;
		this._repositoryFactions = null;

		this._serviceGameSystemsUtility = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryCharacters = this._injector.getService(Constants.InjectorKeys.REPOSITORY_CHARACTERS);
		this._repositoryFactions = this._injector.getService(Constants.InjectorKeys.REPOSITORY_FACTIONS);

		this._serviceGameSystemsUtility = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY);
		this._serviceUsers = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USERS);
	}

	async create(correlationId, user, requestedCharacter) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		this._logger.debug('CharactersService', 'create', 'character', requestedCharacter, null, correlationId);

		const validationCheckCharacterNewResponse = this._serviceValidation.check(correlationId, this._serviceValidation.characterNewSchema, requestedCharacter, null, 'characters');
		if (this._hasFailed(validationCheckCharacterNewResponse))
			return validationCheckCharacterNewResponse;

		const validResponse = await this.valid(correlationId, user, requestedCharacter.gameSystemId, null, requestedCharacter.name, requestedCharacter.number, true);
		if (this._hasFailed(validResponse))
			return validResponse;

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, requestedCharacter.gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const character = serviceResponse.results.initializeCharacter();
		character.init(requestedCharacter.gameSystemId, requestedCharacter.name, requestedCharacter.number, user);

		const calculateResponse = await this._calculate(correlationId, requestedCharacter.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.create(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		if (this._hasFailed(userSettingsResponse))
			return userSettingsResponse;

		return respositoryResponse;
	}

	async delete(correlationId, user, characterId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const respositoryFetchResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('CharactersService', 'delete', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const respositoryResponse = await this._repositoryCharacters.delete(correlationId, user.id, characterId);
		return respositoryResponse;
	}

	async deleteBoon(correlationId, user, characterId, boonId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const validationBoonIdResponse = this._validateId(correlationId, boonId, 'characters');
		if (this._hasFailed(validationBoonIdResponse))
			return validationBoonIdResponse;

		const respositoryFetchResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('CharactersService', 'deleteBoon', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;
		if (!character)
			return this._error('CharactersService', 'deleteBoon', null, null, null, null, correlationId);

		const boon = character.boons.find(l => l.id == boonId);
		if (!boon)
			return this._error('CharactersService', 'deleteBoon', null, null, null, null, correlationId);
		character.boons = character.boons.filter(l => l.id !== boonId);

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, character.gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;
		serviceResponse.results.deleteBoon(character, boon.boonId);

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		return respositoryResponse;
	}

	async deleteInventory(correlationId, user, characterId, inventoryId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const validationInventoryIdResponse = this._validateId(correlationId, inventoryId, 'characters');
		if (this._hasFailed(validationInventoryIdResponse))
			return validationInventoryIdResponse;

		const respositoryFetchResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('CharactersService', 'deleteInventory', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;
		if (!character)
			return this._error('CharactersService', 'deleteInventory', null, null, null, null, correlationId);

		const inventory = character.inventory.filter(l => l.id == inventoryId);
		if (!inventory)
			return this._error('CharactersService', 'deleteInventory', null, null, null, null, correlationId);
		character.inventory = character.inventory.filter(l => l.id !== inventoryId);

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		return respositoryResponse;
	}

	async deleteScenario(correlationId, user, characterId, scenarioId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const validationScenarioIdResponse = this._validateId(correlationId, scenarioId, 'characters');
		if (this._hasFailed(validationScenarioIdResponse))
			return validationScenarioIdResponse;

		const respositoryFetchResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('CharactersService', 'deleteScenario', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;
		if (!character)
			return this._error('CharactersService', 'deleteScenario', null, null, null, null, correlationId);

		const scenario = character.scenarios.filter(l => l.id == scenarioId);
		if (!scenario)
			return this._error('CharactersService', 'deleteScenario', null, null, null, null, correlationId);
		character.scenarios = character.scenarios.filter(l => l.id !== scenarioId);

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		return respositoryResponse;
	}

	async fetch(correlationId, user, characterId) {
		if (user) {
			const userValidationResponse = this._validateUser(correlationId, user);
			if (this._hasFailed(userValidationResponse))
				return userValidationResponse;
		}

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const respositoryResponse = await this._repositoryCharacters.fetch(correlationId, user ? user.id : null, characterId);
		return respositoryResponse;
	}

	async fetchNumber(correlationId, user, gameSystemId) {
		const userValidationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(userValidationResponse))
			return userValidationResponse;

		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryCharacters.fetchNumber(correlationId, user.id, gameSystemId);
		return respositoryResponse;
	}

	async initialize(correlationId, user) {
		const response = this._initResponse(correlationId);
		response.results = {};

		if (user) {
			const validationResponse = this._validateUser(correlationId, user);
			if (this._hasFailed(validationResponse))
				return validationResponse;

			if (!user.plan)
				return this._error('CharactersService', 'initialize', 'Invalid user plan', null, null, null, correlationId);
			this._logger.debug('CharactersService', 'initialize', 'plan', user.plan, null, correlationId);
		}

		const statusResponse = this._getStatus(correlationId);
		response.results.status = statusResponse.results;
		return response;
	}

	async listing(correlationId, user, sections) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const respositoryResponse = await this._repositoryCharacters.listing(correlationId, user.id, sections);
		return respositoryResponse;
	}

	async listingByFavorites(correlationId, user) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const favorites = user.settings.favorites;
		const respositoryResponse = await this._repositoryCharacters.listingFavorites(correlationId, user.id, favorites);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const service = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USERS);

		let validationUserResponse
		for (const item of respositoryResponse.results.data) {
			validationUserResponse = await service.fetchByGamerId(correlationId, item.userId);
			if (this._hasFailed(validationUserResponse))
				continue;

			item.user = validationUserResponse.results;
		}

		return respositoryResponse;
	}

	async listingByGamerId(correlationId, user, requestedUserGamerId, requestedGameSystemId) {
		const validationRequestedGamerIdResponse = this._serviceValidation.check(correlationId, this._serviceValidation.gamerIdSchema, requestedUserGamerId);
		if (this._hasFailed(validationRequestedGamerIdResponse))
			return validationRequestedGamerIdResponse;

		const service = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USERS);
		const validationUserResponse = await service.fetchByGamerId(correlationId, requestedUserGamerId);
		if (this._hasFailed(validationUserResponse))
			return validationUserResponse;

		const userId = validationUserResponse.results.id;
		const validationIdResponse = this._validateId(correlationId, userId);
		if (this._hasFailed(validationIdResponse))
			return validationIdResponse;

		const respositoryResponse = await this._repositoryCharacters.listingExternal(correlationId, userId, requestedGameSystemId);
		return respositoryResponse;
	}

	async listingByGamerTag(correlationId, user, requestedUserGamerTag, requestedGameSystemId) {
		const validationRequestedGamerTagResponse = this._serviceValidation.check(correlationId, this._serviceValidation.gamerTagSchema, requestedUserGamerTag);
		if (this._hasFailed(validationRequestedGamerTagResponse))
			return validationRequestedGamerTagResponse;

		const service = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USERS);
		const validationUserResponse = await service.fetchByGamerTag(correlationId, requestedUserGamerTag);
		if (this._hasFailed(validationUserResponse))
			return validationUserResponse;

		const userId = validationUserResponse.results.id;
		const validationIdResponse = this._validateId(correlationId, userId);
		if (this._hasFailed(validationIdResponse))
			return validationIdResponse;

		const respositoryResponse = await this._repositoryCharacters.listingExternal(correlationId, userId, requestedGameSystemId);
		return respositoryResponse;
	}

	async listingByGameSystem(correlationId, user, gameSystetmId, sections) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystetmId, 'gameSystetmId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryCharacters.listing(correlationId, user.id, sections, gameSystetmId);
		return respositoryResponse;
	}

	async loadInventory(correlationId, user, characterId, gearSetId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const validationGearsetIdResponse = this._validateId(correlationId, gearSetId, 'characters');
		if (this._hasFailed(validationGearsetIdResponse))
			return validationGearsetIdResponse;

		const fetchRespositoryResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(fetchRespositoryResponse))
			return fetchRespositoryResponse;

		const character = fetchRespositoryResponse.results;

		const settingsGameSystem = user.settings.gameSystems.find(l => l.id === character.gameSystemId);
		if (!settingsGameSystem)
			return this._error('CharactersService', 'loadInventory', null, null, null, null, correlationId);

		const gearSet = settingsGameSystem.gearSets.find(l => l.id === gearSetId);
		if (!gearSet)
			return this._error('CharactersService', 'loadInventory', null, null, null, null, correlationId);

		const initialScenario = character.scenarios.find(l => l.order === 0);
		if (!initialScenario)
			return this._error('CharactersService', 'loadInventory', null, null, null, null, correlationId);

		character.inventory = gearSet.inventory.map(l => {
			l.id = LibraryUtility.generateId();
			l.boughtScenarioId = initialScenario.id;
			return l
		});

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		if (this._hasFailed(userSettingsResponse))
			return userSettingsResponse;
		return respositoryResponse;
	}

	async playedScenarios(correlationId, user, characterId) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		const respositoryFetchResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(respositoryFetchResponse))
			// TODO: Security - Needs a real security check
			return this._error('CharactersService', 'playedScenarios', null, null, null, null, correlationId).addGeneric('Invalid permissions', SharedConstants.ErrorCodes.InvalidPermissions);

		const character = respositoryFetchResponse.results;

		const respositoryListingResponse = await this._repositoryCharacters.listing(correlationId, user.id);
		if (this._hasFailed(respositoryListingResponse))
			return respositoryListingResponse;

		const service = this._injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
		const respositoryScenarioListingResponse = await service.listing(correlationId, character.gameSystemId);
		if (this._hasFailed(respositoryScenarioListingResponse))
			return respositoryScenarioListingResponse;

		const scenarios = respositoryScenarioListingResponse.results;

		const response = this._initResponse();
		response.results = {
			played: [],
			valid: true
		}

		let characterScenario;
		let scenario;
		let scenarioResult;
		for (const characterI in respositoryListingResponse.results) {
			for (characterScenario in characterI.scenarios) {
				scenarioResult = this._initValidScenarioResponse();
				scenarioResult.characterId = characterI.id;
				scenarioResult.scenarioId = characterScenario.scenarioId;
				scenarioResult.timestamp = characterScenario.timestamp;
				scenario = scenarios.find(l => l.id === characterScenario.scenarioId);
				if (scenario) {
					scenarioResult.repeatable = scenario.repeatable;
				}
				results.played.push(scenarioResult);
			}
		}

		return response;
	}

	async updateBoon(correlationId, user, characterId, requestedBoon) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		if (!requestedBoon)
			return this._error('CharactersService', 'updateBoon', null, null, null, null, correlationId);

		const isNew = requestedBoon.id === null || requestedBoon.id === undefined

		const validationGameSystemIdResponse = this._characterValidateByGameSystemId(correlationId, requestedBoon.gameSystemId, requestedBoon, isNew ? Constants.ValidationSchemaTypes.CharacterBoonCreate : Constants.ValidationSchemaTypes.CharacterBoonUpdate);
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const fetchRespositoryResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(fetchRespositoryResponse))
			return fetchRespositoryResponse;

		const character = fetchRespositoryResponse.results;

		const validResponse = this._checkUpdatedTimestamp(correlationId, character, requestedBoon, 'characters');
		if (this._hasFailed(validResponse))
			return validResponse;

		const updateResponse = this._updateBoon(correlationId, requestedBoon.gameSystemId, character, requestedBoon);
		if (this._hasFailed(updateResponse))
			return updateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		return respositoryResponse;
	}

	async updateDetails(correlationId, user, characterId, details) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		if (!details)
			return this._error('CharactersService', 'updateDetails', null, null, null, null, correlationId);

		const validationGameSystemIdResponse = this._characterValidateByGameSystemId(correlationId, details.gameSystemId, details, Constants.ValidationSchemaTypes.CharacterDetailsUpdate);
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const validResponse = await this.valid(correlationId, user, details.gameSystemId, details.id, details.name, details.number, false);
		if (this._hasFailed(validResponse))
			return validResponse;

		const fetchRespositoryResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(fetchRespositoryResponse))
			return fetchRespositoryResponse;

		const character = fetchRespositoryResponse.results;
		const validTimestampResponse = this._checkUpdatedTimestamp(correlationId, character, details, 'characters');
		if (this._hasFailed(validTimestampResponse))
			return validTimestampResponse;

		character.name = details.name.trim();
		if (String.isNullOrEmpty(character.name))
			return this._error('CharactersService', 'updateDetails', 'Empty name after trim.', null, null, null, correlationId);

		character.tagLine = details && details.tagLine ? details.tagLine.trim() : null

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, details.gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		const serviceUpdateResponse = serviceResponse.results.updateDetails(correlationId, character, details);
		if (this._hasFailed(serviceUpdateResponse))
			return serviceUpdateResponse;

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		if (this._hasFailed(userSettingsResponse))
			return userSettingsResponse;

		return respositoryResponse;
	}

	async updateInventory(correlationId, user, characterId, requestedInventory) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		if (!requestedInventory)
			return this._error('CharactersService', 'updateInventory', null, null, null, null, correlationId);

		const isNew = requestedInventory.id === null || requestedInventory.id === undefined

		const validationGameSystemIdResponse = this._characterValidateByGameSystemId(correlationId, requestedInventory.gameSystemId, requestedInventory, isNew ? Constants.ValidationSchemaTypes.CharacterInventoryCreate : Constants.ValidationSchemaTypes.CharacterInventoryUpdate);
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const fetchRespositoryResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(fetchRespositoryResponse))
			return fetchRespositoryResponse;

		const character = fetchRespositoryResponse.results;

		const validResponse = this._checkUpdatedTimestamp(correlationId, character, requestedInventory, 'characters');
		if (this._hasFailed(validResponse))
			return validResponse;

		const updateResponse = this._updateInventory(correlationId, requestedInventory.gameSystemId, character, requestedInventory);
		if (this._hasFailed(updateResponse))
			return updateResponse;

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		if (this._hasFailed(userSettingsResponse))
			return userSettingsResponse;
		return respositoryResponse;
	}

	async updateScenario(correlationId, user, characterId, requestedScenario) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		const validationCharacterIdResponse = this._validateId(correlationId, characterId, 'characters');
		if (this._hasFailed(validationCharacterIdResponse))
			return validationCharacterIdResponse;

		if (!requestedScenario)
			return this._error('CharactersService', 'updateScenario', null, null, null, null, correlationId);

		const isNew = requestedScenario.id === null || requestedScenario.id === undefined

		const validationGameSystemIdResponse = this._characterValidateByGameSystemId(correlationId, requestedScenario.gameSystemId, requestedScenario, isNew ? Constants.ValidationSchemaTypes.CharacterScenarioCreate : Constants.ValidationSchemaTypes.CharacterScenarioUpdate);
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const fetchRespositoryResponse = await this._repositoryCharacters.fetch(correlationId, user.id, characterId);
		if (this._hasFailed(fetchRespositoryResponse))
			return fetchRespositoryResponse;

		const character = fetchRespositoryResponse.results;

		const validResponse = this._checkUpdatedTimestamp(correlationId, character, requestedScenario, 'characters');
		if (this._hasFailed(validResponse))
			return validResponse;

		for (let item of character.scenarios) {
			if (item.id === requestedScenario.id)
				continue;

			if (item.order === Number(requestedScenario.order)) {
				const response = this._initResponse(correlationId);
				return response.add('Order exists', SharedConstants.ErrorCodes.DuplicateOrder, SharedConstants.ErrorFields.Order, { order: response.param(requestedScenario.order), objectType: response.paramIl8n('scenario') });
			}
		}

		const updateResponse = this._updateScenario(correlationId, requestedScenario.gameSystemId, character, requestedScenario);
		if (this._hasFailed(updateResponse))
			return updateResponse;

		const calculateResponse = await this._calculate(correlationId, character.gameSystemId, character, user);
		if (this._hasFailed(calculateResponse))
			return calculateResponse;

		const respositoryResponse = await this._repositoryCharacters.update(correlationId, user.id, character);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		const userSettingsResponse = await this._updateSettings(correlationId, user, user.settings);
		return respositoryResponse;
	}

	async valid(correlationId, user, gameSystemId, characterId, name, number, quotaCheck) {
		const validationResponse = this._validateUser(correlationId, user);
		if (this._hasFailed(validationResponse))
			return validationResponse;

		this._logger.debug('CharactersService', 'valid', 'name', name, null, correlationId);
		if (String.isNullOrEmpty(name))
			return this._error('CharactersService', 'valid', 'Invalid name', null, null, null, null, correlationId);

		name = decodeURI(name);
		this._logger.debug('CharactersService', 'valid', 'decoded', name, null, correlationId);

		const validationCheckNameResponse = this._serviceValidation.check(correlationId, this._serviceValidation.nameSchema, name, null, 'characters');
		if (this._hasFailed(validationCheckNameResponse))
			return validationCheckNameResponse;

		const respositoryResponse = await this._repositoryCharacters.valid(correlationId, user.id, gameSystemId, characterId, name, number);
		if (this._hasFailed(respositoryResponse))
			return respositoryResponse;

		this._logger.debug('CharactersService', 'valid', 'count', respositoryResponse.results.count, null, correlationId);
		this._logger.debug('CharactersService', 'valid', 'total', respositoryResponse.results.total, null, correlationId);
		const quota = user.plan.characters;
		this._logger.debug('CharactersService', 'valid', 'count.plan.quota', quota, null, correlationId);

		const response = this._initResponse(correlationId);

		if (quotaCheck) {
			const reachedQuota = respositoryResponse.results.total >= quota;
			if (reachedQuota)
				return response.addGeneric('Reached character quota limit', SharedConstants.ErrorCodes.QuotaReached, { quota: response.param(5), quotaType: response.paramIl8n('character') });
		}

		const nameExists = respositoryResponse.results.countName > 0;
		if (nameExists)
			return response.add('Name exists', SharedConstants.ErrorCodes.DuplicateName, SharedConstants.ErrorFields.Name, { name: response.param(name), objectType: response.paramIl8n('character') });

		const numberExists = respositoryResponse.results.countNumber > 0;
		if (numberExists)
			return response.add('Number exists', SharedConstants.ErrorCodes.DuplicateNumber, SharedConstants.ErrorFields.Number, { number: response.param(number), objectType: response.paramIl8n('character') });

		return response;
	}

	_initValidScenarioResponse() {
		return new ScenarioResult();
	}

	_getStatus(correlationId) {
		const response = this._initResponse(correlationId);
		response.results = [];
		for (const prop in SharedConstants.CharactersStatus)
			response.results.push({ id: SharedConstants.CharactersStatus[prop] });
		return response;
	}

	async _calculate(correlationId, gameSystemId, character, user) {
		const serviceResponse = this._characterServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		return await serviceResponse.results.calculate(correlationId, character, user);
	}

	_characterServiceByGameSystemId(correlationId, gameSystemId) {
		if (!gameSystemId || !this._serviceGameSystemsUtility)
			return this._error('CharactersService', '_characterServiceByGameSystemId', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.characterByGameSystemId(correlationId, gameSystemId);
	}

	_characterValidateByGameSystemId(correlationId, gameSystemId, value, type, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('CharactersService', '_characterValidateByGameSystemId', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.characterValidateByGameSystemId(correlationId, gameSystemId, value, type, params)
	}

	_updateBoon(cgameSystemId, character, requestedBoon) {
		if (!character || !requestedBoon)
			return this._error('CharactersService', '_updateBoon', null, null, null, null, correlationId);

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		requestedBoon.id = requestedBoon.id ? requestedBoon.id : LibraryUtility.generateId();

		let boon = null
		if (!character.boons)
			character.boons = []
		const found = character.boons.find(l => l.id == requestedBoon.id);
		if (found)
			boon = found

		if (!boon) {
			boon = serviceResponse.results.initializeBoon(boon, requestedBoon);
			boon.id = requestedBoon.id;
			character.boons.push(boon);
		}

		serviceResponse.results.updateBoon(boon, character, requestedBoon);

		return this._success(correlationId);
	}

	_updateInventory(correlationId, gameSystemId, character, requestedInventory) {
		if (!character || !requestedInventory)
			return this._error('CharactersService', '_updateInventory', null, null, null, null, correlationId);

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		requestedInventory.id = requestedInventory.id ? requestedInventory.id : LibraryUtility.generateId();

		let inventory = null
		if (!character.inventory)
			character.inventory = []
		const found = character.inventory.find(l => l.id == requestedInventory.id);
		if (found)
			inventory = found

		if (!inventory) {
			inventory = serviceResponse.results.initializeInventory(inventory, requestedInventory);
			inventory.id = requestedInventory.id;
			character.inventory.push(inventory);
		}

		serviceResponse.results.updateInventory(correlationId, inventory, requestedInventory);

		return this._success(correlationId);
	}

	_updateScenario(correlationId, gameSystemId, character, requestedScenario) {
		if (!character || !requestedScenario)
			return this._error('CharactersService', '_updateScenario', null, null, null, null, correlationId);

		const serviceResponse = this._characterServiceByGameSystemId(correlationId, gameSystemId);
		if (this._hasFailed(serviceResponse))
			return serviceResponse;

		requestedScenario.id = requestedScenario.id ? requestedScenario.id : LibraryUtility.generateId();

		let scenario = null
		if (!character.scenarios)
			character.scenarios = []
		const found = character.scenarios.find(l => l.id == requestedScenario.id);
		if (found)
			scenario = found

		if (!scenario) {
			scenario = serviceResponse.results.initializeScenario(scenario, requestedScenario);
			scenario.id = requestedScenario.id;
			character.scenarios.push(scenario);
		}

		serviceResponse.results.updateScenario(correlationId, scenario, character, requestedScenario);

		return this._success(correlationId);
	}

	async _updateSettings(correlationId, user, requestedSettings) {
		return await this._serviceUsers.updateSettings(correlationId, { userId: user.id, settings: requestedSettings });
	}
}

export default CharactersService;

import Constants from '../constants';
import LibraryConstants from '@thzero/library_server/constants';
import SharedConstants from '../common/constants';

import AppUtility from '../utility/app'

import BaseUserService from '@thzero/library_server/service/baseUser';

import UserData from '../common/data/user';

class UserService extends BaseUserService {
	constructor() {
		super();

		this._repositoryUsersI = null;

		this._serviceGameSystemsUtility = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryUsersI = this._injector.getService(LibraryConstants.InjectorKeys.REPOSITORY_USERS);

		this._serviceGameSystemsUtility = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY);
	}

	async fetchFavoritesByGamerId(correlationId, requestedGamerId) {
		const validationRequestedGamerIdResponse = this._serviceValidation.check(correlationId, this._serviceValidation.gamerIdSchema, requestedGamerId);
		if (!validationRequestedGamerIdResponse.success)
			return validationRequestedGamerIdResponse;

		const respositoryResponse = await this._repositoryUser.fetchByGamerId(correlationId, requestedGamerId, true);
		if (!respositoryResponse.success)
			return respositoryResponse;

		const user = respositoryResponse.results;
		if (!user || !user.settings || !user.settings.favorites)
			return this._error('UserService', 'fetchFavoritesByGamerId', null, null, null, null, correlationId);

		const userIds = [];
		for (const fav of user.settings.favorites)
			userIds.push(fav.id);

		const respositoryUsersResponse = await this._repositoryUser.fetchByGamerIds(correlationId, userIds);
		if (!respositoryUsersResponse.success)
			return respositoryUsersResponse;

		const response = this._initResponse(correlationId);
		const users = respositoryUsersResponse.results.data;
		let user2;
		for (const fav of user.settings.favorites) {
			user2 = users.find(l => l.id == fav.id);
			fav.name = user2 && user2.settings ? user2.settings.gamerTag : null;
		}
		response.results = user.settings.favorites;

		return response;
	}

	_getDefaultPlan() {
		return Constants.Plans.BASIC;
	}

	_getDefaultUserRole() {
		return SharedConstants.Roles.User;
	}

	_initiateUser() {
		return new UserData();
	}

	async _updateSettings(correlationId, requestedSettings) {
		if (requestedSettings.settings.gamerTag) {
			requestedSettings.settings.gamerTag = requestedSettings.settings.gamerTag.trim();
			requestedSettings.settings.gamerTagSearch = AppUtility.generateGamerTagSearch(requestedSettings.settings.gamerTag);
		}
		else {
			requestedSettings.settings.gamerTag = null;
			requestedSettings.settings.gamerTagSearch = null;
		}

		return this._success(correlationId);
	}

	async _updateSettingsValidation(correlationId, requestedSettings) {
		const respositoryResponse = await this._repositoryUser.valid(correlationId, requestedSettings.userId, requestedSettings.settings.gamerTag);
		if (!respositoryResponse.success)
			return respositoryResponse;

		const response = this._initResponse(correlationId);
		const nameExists = respositoryResponse.results;
		if (nameExists) {
			response.add('Name exists', SharedConstants.ErrorCodes.DuplicateGamerTag, SharedConstants.ErrorFields.GamerTag, { objectType: response.paramIl8n('gamerTag') });
			return response;
		}

		if (requestedSettings.settings && requestedSettings.settings.scenarios && requestedSettings.settings.scenarios.additional) {
			let validationResponse = null;
			const entries = Object.entries(requestedSettings.settings.scenarios.additional)
			for (const [key, value] of entries) {
				validationResponse = this._validateId(correlationId, value.id);
				if (!validationResponse.success)
					return validationResponse;
				validationResponse = this._validateByGameSystemId(correlationId, value.id, value, Constants.ValidationSchemaTypes.UserSettingsSchema);
				if (!validationResponse.success)
					return validationResponse;
			}
		}

		return this._success(correlationId);
	}

	_validateByGameSystemId(correlationId, gameSystemId, value, type, params) {
		if (!this._serviceGameSystemsUtility)
			return this._error('UserService', '_validateByGameSystemId', null, null, null, null, correlationId);

		return this._serviceGameSystemsUtility.validateByGameSystemId(correlationId, gameSystemId, value, type, params)
	}

	get _repositoryUser() {
		return this._repositoryUsersI;
	}
}

export default UserService;

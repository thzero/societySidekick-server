import Joi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
Joi.extend(JoiDate);

import SharedConstants from '../../../common/constants';

import GamerJoiValidationService from '@thzero/library/service_validation_joi/gamer';

class JoiValidationService extends GamerJoiValidationService {
	_characterNumber = Joi.number().min(1).max(99);

	_inventoryItem = Joi.string()
		.trim()
		//.alphanum()
		.regex(/^[a-zA-Z0-9]+(['"_\-a-zA-Z0-9 \(\)]*)*$/)
		.min(3)
		.max(30);

	_settingsSortByBoons = Joi.string().trim().valid(...Object.values(SharedConstants.SortBy.Boons));
	_settingsSortByCharacters = Joi.string().trim().valid(...Object.values(SharedConstants.SortBy.Characters));
	_settingsSortByScenarios = Joi.string().trim().valid(...Object.values(SharedConstants.SortBy.Scenarios));

	_settingBoonsSchema = Joi.object({
		seasonFilter: this._number.allow(null),
		sortBy: this._settingsSortByBoons.allow(null),
		sortDirection: Joi.boolean().allow(null)
	});

	_settingCharactersSchema = Joi.object({
		sortBy: this._settingsSortByCharacters.allow(null),
		sortDirection: Joi.boolean().allow(null)
	});

	_settingFavorite = Joi.object({
		id: this._id.required(),
		favorite: Joi.boolean()
	});
	_settingFavoritesSchema = Joi.array().items(this._settingFavorite).allow(null);

	_settingGearSetInventory = Joi.object({
		itemId: this._id.allow(null),
		item: this._inventoryItem.required(),
		quantity: this._number.required(),
		value: this._number.required()
	});
	_settingGearSet = Joi.object({
		id: this._id.required(),
		name: this._name.required(),
		inventory: Joi.array().items(this._settingGearSetInventory).allow(null)
	});
	_settingsGameSystem = Joi.object({
		id: this._id.required(),
		number: this._number.allow(null).allow(''),
		achievementPoints: this._number.allow(null).allow(''), // TODO
		gearSets: Joi.array().items(this._settingGearSet).allow(null)
	});
	_settingsGameSystems = Joi.array().items(this._settingsGameSystem);

	_settingHomeSchema = Joi.object({
		gameSystemFilter: this._id.allow(null),
		tab: this._number.allow(null)
	});

	_settingLocationName = Joi.string()
		.trim()
		//.alphanum()
		.regex(/^[a-zA-Z0-9]+(['"_,.\-a-zA-Z0-9 \(\)]*)*$/)
		.min(3)
		.max(30);
	_settingLocation = Joi.object({
		id: this._id.required(),
		location: this._settingLocationName.required(),
		name: this._name.required()
	});
	_settingLocationsSchema = Joi.array().items(this._settingLocation).allow(null);

	_settingScenariosSchema = Joi.object({
		additional: Joi.array().allow(null),
		seasonFilter: this._number.allow(null),
		sortBy: this._settingsSortByScenarios.allow(null),
		sortDirection: Joi.boolean().allow(null)
	});

	_settingScenariosAdditionalSchema = Joi.object({
		id: this._id.required(),
	});

	_settingSchema = Joi.object({
		boons: this._settingBoonsSchema.allow(null),
		characters: this._settingCharactersSchema.allow(null),
		favorites: this._settingFavoritesSchema.allow(null),
		gameSystems: this._settingsGameSystems.allow(null),
		home: this._settingHomeSchema.allow(null),
		locations: this._settingLocationsSchema.allow(null),
		scenarios: this._settingScenariosSchema.allow(null)
	});

	characterNewSchema = Joi.object({
		gameSystemId: this._id.required(),
		name: this._name.required(),
		number: this._characterNumber.required()
	});

	settingRequestSchema() {
		const validation = super.settingRequestSchema();
		return validation.concat(Joi.object({
			settings: this._settingSchema.required()
		}));
	}

	settingScenariosAdditionalSchema() {
		return this._settingScenariosAdditionalSchema;
	}
}

export default JoiValidationService;

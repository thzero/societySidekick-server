import Constants from '../../constants';
import RepositoryConstants from '@thzero/library_server_repository_mongo/constants';

import FrontApiBootPlugin from '@thzero/library_server/boot/plugins/apiFront';

import boonsRepository from '../../repository/mongo/boons';
import charactersRepository from '../../repository/mongo/characters';
import cleanupRepository from '../../repository/mongo/cleanup';
import classesRepository from '../../repository/mongo/classes';
import equipmentRepository from '../../repository/mongo/equipment';
import factionsRepository from '../../repository/mongo/factions';
import gameSystemsRepository from '../../repository/mongo/gameSystems';
import organizedPlayRepository from '../../repository/mongo/organizedPlay';
import scenariosRepository from '../../repository/mongo/scenarios';
import siteRepository from '../../repository/mongo/site';

import apiRoute from '../../routes/api';
import boonsRoute from '../../routes/boons'
import charactersRoute from '../../routes/characters';
import classesRoute from '../../routes/classes'
import cleanupRoute from '../../routes/cleanup';
import equipmentRoute from '../../routes/equipment';
import factionsRoute from '../../routes/factions';
import scenariosRoute from '../../routes/scenarios';

import boonsService from '../../service/boons';
import charactersService from '../../service/characters';
import classesService from '../../service/classes';
import cleanupService from '../../service/cleanup';
import equipmentService from '../../service/equipment';
import factionsService from '../../service/factions';
import gameSystemsService from '../../service/gameSystems';

// GameSystems Update
import gameSystemsUtilityService from '../../gameSystems/service/utility';
// Pathfinder 2e
import gameSystemsPathfinder2eService from '../../gameSystems/pathfinder2e/service/index';
import gameSystemsCharacterPathfinder2eService from '../../gameSystems/pathfinder2e/service/character';
import gameSystemsCharacterValidationPathfinder2eService from '../../gameSystems/pathfinder2e/service/validation/joi/character';
import gameSystemsRulesPathfinder2eService from '../../common/gameSystems/pathfinder2e/service/rules';
import gameSystemsScenarioPathfinder2eService from '../../gameSystems/pathfinder2e/service/scenario';
import gameSystemsScenarioValidationPathfinder2eService from '../../gameSystems/pathfinder2e/service/validation/joi/scenario';
import gameSystemsValidationPathfinder2eService from '../../gameSystems/pathfinder2e/service/validation/joi';
// Starfinder 1e
import gameSystemsStarfinder1eService from '../../gameSystems/starfinder1e/service/index';
import gameSystemsCharacterStarfinder1eService from '../../gameSystems/starfinder1e/service/character';
import gameSystemsCharacterValidationStarfinder1eService from '../../gameSystems/starfinder1e/service/validation/joi/character';
import gameSystemsRulesStarfinder1eService from '../../common/gameSystems/starfinder1e/service/rules';
import gameSystemsScenarioStarfinder1eService from '../../gameSystems/starfinder1e/service/scenario';
import gameSystemsScenarioValidationStarfinder1eService from '../../gameSystems/starfinder1e/service/validation/joi/scenario';
import gameSystemsValidationStarfinder1eService from '../../gameSystems/starfinder1e/service/validation/joi';

import repositoryCollectionsService from '../../repository/mongo/collections';
import organizedPlayService from '../../service/organizedPlay';
import scenariosService from '../../service/scenarios';
import securityService from '../../service/security';
import siteService from '../../service/site';
import validationService from '../../service/validation/joi';
import utilityService from '../../service/utility';
import versionService from '../../service/version';

class AppApiBootPlugin extends FrontApiBootPlugin {
	async _initRepositories() {
		await super._initRepositories();

		this._injectRepository(Constants.InjectorKeys.REPOSITORY_BOONS, new boonsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CHARACTERS, new charactersRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CLASSES, new classesRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CLEANUP, new cleanupRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_EQUIPMENT, new equipmentRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_FACTIONS, new factionsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_GAMESYSTEMS, new gameSystemsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ORGANIZEDPLAY, new organizedPlayRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_SCENARIOS, new scenariosRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_SITE, new siteRepository());
	}

	async _initRoutes() {
		await super._initRoutes();

		this._initRoute(new apiRoute());
		this._initRoute(new boonsRoute());
		this._initRoute(new charactersRoute());
		this._initRoute(new classesRoute());
		this._initRoute(new equipmentRoute());
		this._initRoute(new factionsRoute());
		this._initRoute(new scenariosRoute());
		this._initRoute(new cleanupRoute());
	}

	async _initServices() {
		await super._initServices();

		this._injectService(RepositoryConstants.InjectorKeys.SERVICE_REPOSITORY_COLLECTIONS, new repositoryCollectionsService());

		this._injectService(Constants.InjectorKeys.SERVICE_BOONS, new boonsService());
		this._injectService(Constants.InjectorKeys.SERVICE_CHARACTERS, new charactersService());
		this._injectService(Constants.InjectorKeys.SERVICE_CLASSES, new classesService());
		this._injectService(Constants.InjectorKeys.SERVICE_CLEANUP, new cleanupService());
		this._injectService(Constants.InjectorKeys.SERVICE_EQUIPMENT, new equipmentService());
		this._injectService(Constants.InjectorKeys.SERVICE_FACTIONS, new factionsService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS, new gameSystemsService());

		// GameSystems Update
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY, new gameSystemsUtilityService());
		// Pathfinder 2e
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E, new gameSystemsCharacterPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_PATHFINDER_2E, new gameSystemsCharacterValidationPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E, new gameSystemsPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E, new gameSystemsRulesPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_PATHFINDER_2E, new gameSystemsScenarioPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_PATHFINDER_2E, new gameSystemsScenarioValidationPathfinder2eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_PATHFINDER_2E, new gameSystemsValidationPathfinder2eService());
		// Starfinder 1e
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_STARFINDER_1E, new gameSystemsCharacterStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_STARFINDER_1E, new gameSystemsCharacterValidationStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E, new gameSystemsRulesStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_STARFINDER_1E, new gameSystemsScenarioStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_STARFINDER_1E, new gameSystemsScenarioValidationStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E, new gameSystemsStarfinder1eService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_STARFINDER_1E, new gameSystemsValidationStarfinder1eService());

		this._injectService(Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY, new organizedPlayService());
		this._injectService(Constants.InjectorKeys.SERVICE_SCENARIOS, new scenariosService());
		this._injectService(Constants.InjectorKeys.SERVICE_SITE, new siteService());
		this._injectService(Constants.InjectorKeys.SERVICE_UTILITY, new utilityService());
		this._injectService(Constants.InjectorKeys.SERVICE_VALIDATION, new validationService());
	}

	_initServicesSecurity() {
		return new securityService();
	}

	_initServicesVersion() {
		return new versionService();
	}
}

export default AppApiBootPlugin;

import Constants from '../../../constants.js';
import RepositoryConstants from '@thzero/library_server_repository_mongo/constants.js';

import FrontApiBootPlugin from '@thzero/library_server_fastify/boot/plugins/apiFront.js';

import boonsRepository from '../../../repository/mongo/boons.js';
import charactersRepository from '../../../repository/mongo/characters.js';
import cleanupRepository from '../../../repository/mongo/cleanup.js';
import classesRepository from '../../../repository/mongo/classes.js';
import equipmentRepository from '../../../repository/mongo/equipment.js';
import factionsRepository from '../../../repository/mongo/factions.js';
import gameSystemsRepository from '../../../repository/mongo/gameSystems.js';
import organizedPlayRepository from '../../../repository/mongo/organizedPlay.js';
import scenariosRepository from '../../../repository/mongo/scenarios.js';
import siteRepository from '../../../repository/mongo/site.js';

import apiRoute from '../../../routes/fastify/api.js';
import boonsRoute from '../../../routes/fastify/boons.js'
import charactersRoute from '../../../routes/fastify/characters.js';
import classesRoute from '../../../routes/fastify/classes.js'
import cleanupRoute from '../../../routes/fastify/cleanup.js';
import equipmentRoute from '../../../routes/fastify/equipment.js';
import factionsRoute from '../../../routes/fastify/factions.js';
import scenariosRoute from '../../../routes/fastify/scenarios.js';
import usersRoute from '../../../routes/fastify/users.js';

import apiService from '../../../service/api.js';
import boonsService from '../../../service/boons.js';
import charactersService from '../../../service/characters.js';
import classesService from '../../../service/classes.js';
import cleanupService from '../../../service/cleanup.js';
import equipmentService from '../../../service/equipment.js';
import factionsService from '../../../service/factions.js';
import gameSystemsService from '../../../service/gameSystems.js';

// GameSystems Update
import gameSystemsUtilityService from '../../../gameSystems/service/utility.js';
// Pathfinder 2e
import gameSystemsPathfinder2eService from '../../../gameSystems/pathfinder2e/service/index.js';
import gameSystemsCharacterPathfinder2eService from '../../../gameSystems/pathfinder2e/service/character.js';
import gameSystemsCharacterValidationPathfinder2eService from '../../../gameSystems/pathfinder2e/service/validation/joi/character.js';
import gameSystemsRulesPathfinder2eService from '../../../common/gameSystems/pathfinder2e/service/rules.js';
import gameSystemsScenarioPathfinder2eService from '../../../gameSystems/pathfinder2e/service/scenario.js';
import gameSystemsScenarioValidationPathfinder2eService from '../../../gameSystems/pathfinder2e/service/validation/joi/scenario.js';
import gameSystemsValidationPathfinder2eService from '../../../gameSystems/pathfinder2e/service/validation/joi/index.js';
// Starfinder 1e
import gameSystemsStarfinder1eService from '../../../gameSystems/starfinder1e/service/index.js';
import gameSystemsCharacterStarfinder1eService from '../../../gameSystems/starfinder1e/service/character.js';
import gameSystemsCharacterValidationStarfinder1eService from '../../../gameSystems/starfinder1e/service/validation/joi/character.js';
import gameSystemsRulesStarfinder1eService from '../../../common/gameSystems/starfinder1e/service/rules.js';
import gameSystemsScenarioStarfinder1eService from '../../../gameSystems/starfinder1e/service/scenario.js';
import gameSystemsScenarioValidationStarfinder1eService from '../../../gameSystems/starfinder1e/service/validation/joi/scenario.js';
import gameSystemsValidationStarfinder1eService from '../../../gameSystems/starfinder1e/service/validation/joi/index.js';

import repositoryCollectionsService from '../../../repository/mongo/collections.js';
import organizedPlayService from '../../../service/organizedPlay.js';
import scenariosService from '../../../service/scenarios.js';
import securityService from '../../../service/security.js';
import siteService from '../../../service/site.js';
import validationService from '../../../service/validation/joi/index.js';
import versionService from '../../../service/version.js';

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

	_initRoutesUsers() {
		return new usersRoute();
	}

	async _initServices() {
		await super._initServices();

		this._injectService(RepositoryConstants.InjectorKeys.SERVICE_REPOSITORY_COLLECTIONS, new repositoryCollectionsService());

		this._injectService(Constants.InjectorKeys.SERVICE_API, new apiService());
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

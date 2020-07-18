import Constants from './constants';
import RepositoryConstants from '@thzero/library_repository_mongo/constants';

// Admin Updates
import adminBoonsRoute from './routes/admin/boons';
import adminClassesRoute from './routes/admin/classes';
import adminEquipmentRoute from './routes/admin/equipment';
import adminFactionsRoute from './routes/admin/factions';
import adminScenariosRoute from './routes/admin/scenarios';

import apiRoute from './routes/api';
import boonsRoute from './routes/boons'
import classesRoute from './routes/classes'
import charactersRoute from './routes/characters';
import cleanupRoute from './routes/cleanup';
import equipmentRoute from './routes/equipment';
import factionsRoute from './routes/factions';
import scenariosRoute from './routes/scenarios';
import usersRoute from './routes/users';

// Admin Updates
import adminBoonsRepository from './repository/mongo/admin/boons';
import adminClassesRepository from './repository/mongo/admin/classes';
import adminEquipmentRepository from './repository/mongo/admin/equipment';
import adminFactionsRepository from './repository/mongo/admin/factions';
import adminNewsRepository from './repository/mongo/admin/news';
import adminScenariosRepository from './repository/mongo/admin/scenarios';
import adminUsersRepository from './repository/mongo/admin/users';

import boonsRepository from './repository/mongo/boons';
import charactersRepository from './repository/mongo/characters';
import classesRepository from './repository/mongo/classes';
import cleanupRepository from './repository/mongo/cleanup';
import equipmentRepository from './repository/mongo/equipment';
import factionsRepository from './repository/mongo/factions';
import gameSystemsRepository from './repository/mongo/gameSystems';
import newsRepository from '@thzero/library_repository_mongo/news';
import plansRepository from '@thzero/library_repository_mongo/plans';
import scenariosRepository from './repository/mongo/scenarios';
import siteRepository from './repository/mongo/site';
import userRepository from './repository/mongo/user';
import usageMetricsRepository from '@thzero/library_repository_mongo/usageMetrics';

// Admin Updates
import adminBoonsService from './service/admin/boons';
import adminClassesService from './service/admin/classes';
import adminEquipmentService from './service/admin/equipment';
import adminFactionsService from './service/admin/factions';
import adminNewsService from './service/admin/news';
import adminScenariosService from './service/admin/scenarios';
import adminUsersService from './service/admin/users';

import boonsService from './service/boons';
import classesService from './service/classes';
import charactersService from './service/characters';
import equipmentService from './service/equipment';
import factionsService from './service/factions';
import gameSystemsService from './service/gameSystems';
import loggerService from '@thzero/library_logger_pino';
import versionService from './service/version';

// GameSystems Update
import gameSystemsUtilityService from './gameSystems/service/utility';
// Pathfinder 2e
import gameSystemsPathfinder2eService from './gameSystems/pathfinder2e/service/index';
import gameSystemsCharacterPathfinder2eService from './gameSystems/pathfinder2e/service/character';
import gameSystemsCharacterValidationPathfinder2eService from './gameSystems/pathfinder2e/service/validation/joi/character';
import gameSystemsRulesPathfinder2eService from './common/gameSystems/pathfinder2e/service/rules';
import gameSystemsScenarioPathfinder2eService from './gameSystems/pathfinder2e/service/scenario';
import gameSystemsScenarioValidationPathfinder2eService from './gameSystems/pathfinder2e/service/validation/joi/scenario';
import gameSystemsValidationPathfinder2eService from './gameSystems/pathfinder2e/service/validation/joi';
// Starfinder 1e
import gameSystemsStarfinder1eService from './gameSystems/starfinder1e/service/index';
import gameSystemsCharacterStarfinder1eService from './gameSystems/starfinder1e/service/character';
import gameSystemsCharacterValidationStarfinder1eService from './gameSystems/starfinder1e/service/validation/joi/character';
import gameSystemsRulesStarfinder1eService from './common/gameSystems/starfinder1e/service/rules';
import gameSystemsScenarioStarfinder1eService from './gameSystems/starfinder1e/service/scenario';
import gameSystemsScenarioValidationStarfinder1eService from './gameSystems/starfinder1e/service/validation/joi/scenario';
import gameSystemsValidationStarfinder1eService from './gameSystems/starfinder1e/service/validation/joi';

import authService from './service/auth';
import cleanupService from './service/cleanup';
import newsService from './service/news';
import newsValidationService from './service/news/validation/joi';
import repositoryCollectionsService from './repository/mongo/collections';
import scenariosService from './service/scenarios';
import securityService from './service/security';
import siteService from './service/site';
import userService from './service/user';
import validationService from './service/validation/joi';

import BootMain from '@thzero/library/boot/main';

class AppBootMain extends BootMain {
	_initRepositories() {
		// Admin Updates
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_BOONS, new adminBoonsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_CLASSES, new adminClassesRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_EQUIPMENT, new adminEquipmentRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_FACTIONS, new adminFactionsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_SCENARIOS, new adminScenariosRepository());

		this._injectRepository(Constants.InjectorKeys.REPOSITORY_BOONS, new boonsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CLASSES, new classesRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CHARACTERS, new charactersRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_EQUIPMENT, new equipmentRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_FACTIONS, new factionsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_GAMESYSTEMS, new gameSystemsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_SCENARIOS, new scenariosRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_SITE, new siteRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_CLEANUP, new cleanupRepository());
	}

	_initRepositoriesAdminNews() {
		return new adminNewsRepository();
	}

	_initRepositoriesAdminUsers() {
		return new adminUsersRepository();
	}

	_initRepositoriesNews() {
		return new newsRepository();
	}

	_initRepositoriesPlans() {
		return new plansRepository();
	}

	_initRepositoriesUsageMetrics() {
		return new usageMetricsRepository();
	}

	_initRepositoriesUsers() {
		return new userRepository();
	}

	_initRoutes() {
		// Admin Updates
		this._initRoute(new adminBoonsRoute());
		this._initRoute(new adminClassesRoute());
		this._initRoute(new adminEquipmentRoute());
		this._initRoute(new adminFactionsRoute());
		this._initRoute(new adminScenariosRoute());

		this._initRoute(new apiRoute());
		this._initRoute(new boonsRoute());
		this._initRoute(new classesRoute());
		this._initRoute(new charactersRoute());
		this._initRoute(new equipmentRoute());
		this._initRoute(new factionsRoute());
		this._initRoute(new scenariosRoute());
		this._initRoute(new cleanupRoute());
	}

	_initRoutesUsers() {
		return new usersRoute();
	}

	_initServices() {
		this._injectService(RepositoryConstants.InjectorKeys.SERVICE_REPOSITORY_COLLECTIONS, new repositoryCollectionsService());

		this._injectService(Constants.InjectorKeys.SERVICE_BOONS, new boonsService());
		this._injectService(Constants.InjectorKeys.SERVICE_CLASSES, new classesService());
		this._injectService(Constants.InjectorKeys.SERVICE_CHARACTERS, new charactersService());
		this._injectService(Constants.InjectorKeys.SERVICE_EQUIPMENT, new equipmentService());
		this._injectService(Constants.InjectorKeys.SERVICE_FACTIONS, new factionsService());
		this._injectService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS, new gameSystemsService());
		this._injectService(Constants.InjectorKeys.SERVICE_SCENARIOS, new scenariosService());
		this._injectService(Constants.InjectorKeys.SERVICE_SITE, new siteService());
		this._injectService(Constants.InjectorKeys.SERVICE_VALIDATION, new validationService());
		this._injectService(Constants.InjectorKeys.SERVICE_CLEANUP, new cleanupService());

		// Admin Updates
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS, new adminBoonsService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES, new adminClassesService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT, new adminEquipmentService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS, new adminFactionsService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS, new adminScenariosService());

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
	}

	_initServicesAdminNews() {
		return new adminNewsService();
	}

	_initServicesAdminUsers() {
		return new adminUsersService();
	}

	_initServicesAuth() {
		return new authService();
	}

	_initServicesLogger() {
		return new loggerService();
	}

	_initServicesNews() {
		return new newsService();
	}

	_initServicesNewsValidation() {
		return new newsValidationService();
	}

	_initServicesSecurity() {
		return new securityService();
	}

	_initServicesUser() {
		return new userService();
	}

	_initServiceVersion() {
		return new versionService();
	}
}

(new AppBootMain()).start();

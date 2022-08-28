import Constants from '../../../constants.js';

import BootPlugin from '@thzero/library_server/boot/plugins/index.js';

import adminBoonsRepository from '../../../repository/mongo/admin/boons.js';
import adminClassesRepository from '../../../repository/mongo/admin/classes.js';
import adminEquipmentRepository from '../../../repository/mongo/admin/equipment.js';
import adminFactionsRepository from '../../../repository/mongo/admin/factions.js';
import adminScenariosRepository from '../../../repository/mongo/admin/scenarios.js';

import adminBoonsRoute from '../../../routes/fastify/admin/boons.js';
import adminClassesRoute from '../../../routes/fastify/admin/classes.js';
import adminEquipmentRoute from '../../../routes/fastify/admin/equipment.js';
import adminFactionsRoute from '../../../routes/fastify/admin/factions.js';
import adminScenariosRoute from '../../../routes/fastify/admin/scenarios.js';

import adminBoonsService from '../../../service/admin/boons.js';
import adminClassesService from '../../../service/admin/classes.js';
import adminEquipmentService from '../../../service/admin/equipment.js';
import adminFactionsService from '../../../service/admin/factions.js';
import adminScenariosService from '../../../service/admin/scenarios.js';

class AppAdminBootPlugin extends BootPlugin {
	async _initRepositories() {
		await super._initRepositories();

		// Admin Updates
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_BOONS, new adminBoonsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_CLASSES, new adminClassesRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_EQUIPMENT, new adminEquipmentRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_FACTIONS, new adminFactionsRepository());
		this._injectRepository(Constants.InjectorKeys.REPOSITORY_ADMIN_SCENARIOS, new adminScenariosRepository());
	}

	async _initRoutes() {
		await super._initRoutes();

		this._initRoute(new adminBoonsRoute());
		this._initRoute(new adminClassesRoute());
		this._initRoute(new adminEquipmentRoute());
		this._initRoute(new adminFactionsRoute());
		this._initRoute(new adminScenariosRoute());
	}

	async _initServices() {
		await super._initServices();

		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS, new adminBoonsService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES, new adminClassesService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT, new adminEquipmentService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS, new adminFactionsService());
		this._injectService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS, new adminScenariosService());
	}
}

export default AppAdminBootPlugin;

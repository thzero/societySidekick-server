import Constants from '../../../constants';

import BootPlugin from '@thzero/library_server/boot/plugins/index';

import adminBoonsRepository from '../../../repository/mongo/admin/boons';
import adminClassesRepository from '../../../repository/mongo/admin/classes';
import adminEquipmentRepository from '../../../repository/mongo/admin/equipment';
import adminFactionsRepository from '../../../repository/mongo/admin/factions';
import adminScenariosRepository from '../../../repository/mongo/admin/scenarios';

import adminBoonsRoute from '../../../routes/fastify/admin/boons';
import adminClassesRoute from '../../../routes/fastify/admin/classes';
import adminEquipmentRoute from '../../../routes/fastify/admin/equipment';
import adminFactionsRoute from '../../../routes/fastify/admin/factions';
import adminScenariosRoute from '../../../routes/fastify/admin/scenarios';

import adminBoonsService from '../../../service/admin/boons';
import adminClassesService from '../../../service/admin/classes';
import adminEquipmentService from '../../../service/admin/equipment';
import adminFactionsService from '../../../service/admin/factions';
import adminScenariosService from '../../../service/admin/scenarios';

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

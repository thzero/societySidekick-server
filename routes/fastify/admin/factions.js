import Constants from '../../../constants.js';

import AdminRoute from '@thzero/library_server_fastify/routes/admin/index.js';

class FactionsAdminRoute extends AdminRoute {
	constructor() {
		super('factions', 'factions', Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
	}

	get id() {
		return 'admin-factions';
	}
}

export default FactionsAdminRoute;

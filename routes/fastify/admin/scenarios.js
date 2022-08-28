import Constants from '../../../constants.js';

import AdminRoute from '@thzero/library_server_fastify/routes/admin/index.js';

class ScenariosAdminRoute extends AdminRoute {
	constructor() {
		super('scenarios', 'scenarios', Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
	}

	get id() {
		return 'admin-scenarios';
	}
}

export default ScenariosAdminRoute;

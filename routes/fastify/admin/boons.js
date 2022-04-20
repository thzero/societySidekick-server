import Constants from '../../../constants';

import AdminRoute from '@thzero/library_server_fastify/routes/admin/index';

class BoonAdminRoute extends AdminRoute {
	constructor() {
		super('boons', 'boons', Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
	}

	get id() {
		return 'admin-boons';
	}
}

export default BoonAdminRoute;

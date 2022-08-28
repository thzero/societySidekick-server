import Constants from '../../../constants.js';

import AdminRoute from '@thzero/library_server_fastify/routes/admin/index.js';

class ClassesAdminRoute extends AdminRoute {
	constructor() {
		super('classes', 'classes', Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
	}

	get id() {
		return 'admin-classes';
	}
}

export default ClassesAdminRoute;

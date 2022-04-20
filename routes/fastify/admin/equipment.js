import Constants from '../../../constants';

import AdminRoute from '@thzero/library_server_fastify/routes/admin/index';

class EquipmentAdminRoute extends AdminRoute {
	constructor() {
		super('equipment', 'equipment', Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
	}

	get id() {
		return 'admin-equipment';
	}
}

export default EquipmentAdminRoute;

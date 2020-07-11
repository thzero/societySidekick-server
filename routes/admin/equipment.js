import Constants from '../../constants';

import AdminRoute from '@thzero/library/routes/admin/index'

class EquipmentAdminRoute extends AdminRoute {
	constructor() {
		super('equipment', 'equipment', Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT, true, true, true);
	}
}

export default EquipmentAdminRoute;

import Constants from '../../constants';

import AdminRoute from '@thzero/library_server/routes/admin/index'

class BoonAdminRoute extends AdminRoute {
	constructor() {
		super('boons', 'boons', Constants.InjectorKeys.SERVICE_ADMIN_BOONS, true, true, true);
	}
}

export default BoonAdminRoute;

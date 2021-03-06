
import Constants from '../../constants';

import AdminRoute from '@thzero/library_server/routes/admin/index'

class ScenariosAdminRoute extends AdminRoute {
	constructor() {
		super('scenarios', 'scenarios', Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS, true, true, true);
	}
}

export default ScenariosAdminRoute;

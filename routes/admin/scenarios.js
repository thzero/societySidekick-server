
import Constants from '../../constants';

import AdminRoute from '@thzero/library/routes/admin/index'

class ScenariosAdminRoute extends AdminRoute {
	constructor() {
		super('scenarios', 'scenarios', Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS, true, true, true);
	}
}

export default ScenariosAdminRoute;

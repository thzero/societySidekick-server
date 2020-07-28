import Constants from '../../constants';

import AdminRoute from '@thzero/library_server/routes/admin/index'

class FactionsAdminRoute extends AdminRoute {
	constructor() {
		super('factions', 'factions', Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS, true, true, true);
	}
}

export default FactionsAdminRoute;

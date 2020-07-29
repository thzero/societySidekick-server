import Constants from '../../constants';

import AdminRoute from '@thzero/library_server/routes/admin/index'

class ClassesAdminRoute extends AdminRoute {
	constructor() {
		super('classes', 'classes', Constants.InjectorKeys.SERVICE_ADMIN_CLASSES, true, true, true);
	}
}

export default ClassesAdminRoute;

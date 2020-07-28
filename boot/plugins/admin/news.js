import NewsAdminBootPlugin from '@thzero/library/boot/plugins/admin/news';

import adminNewsRepository from '../../../repository/mongo/admin/news';

import adminNewsService from '../../../service/admin/news';

class AppNewsAdminBootPlugin extends NewsAdminBootPlugin {
	_initRepositoriesAdminNews() {
		return new adminNewsRepository();
	}

	_initServicesAdminNews() {
		return new adminNewsService();
	}
}

export default AppNewsAdminBootPlugin;

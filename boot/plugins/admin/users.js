import UsersAdminBootPlugin from '@thzero/library_server/boot/plugins/admin/users';

import adminUsersRepository from '../../../repository/mongo/admin/users';

import adminUsersService from '../../../service/admin/users';

class AppUsersAdminBootPlugin extends UsersAdminBootPlugin {
	_initRepositoriesAdminUsers() {
		return new adminUsersRepository();
	}

	_initServicesAdminUsers() {
		return new adminUsersService();
	}
}

export default AppUsersAdminBootPlugin;

import UsersApiBootPlugin from '@thzero/library/boot/plugins/users';

import plansRepository from '@thzero/library_repository_mongo/plans';
import userRepository from '../../repository/mongo/user';

import authService from '../../service/auth';
import securityService from '../../service/security';
import userService from '../../service/user';

class AppUsersApiBootPlugin extends UsersApiBootPlugin {
	_initRepositoriesPlans() {
		return new plansRepository();
	}

	_initRepositoriesUsers() {
		return new userRepository();
	}

	_initServicesAuth() {
		return new authService();
	}

	_initServicesSecurity() {
		return new securityService();
	}

	_initServicesUser() {
		return new userService();
	}
}

export default AppUsersApiBootPlugin;

import BaseUsersAdminService from '@thzero/library_server/service/admin/users';

import UserData from '../../common/data/user';

class UsersAdminService extends BaseUsersAdminService {
	_initializeData() {
		return new UserData();
	}
}

export default UsersAdminService;

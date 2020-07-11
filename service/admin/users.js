import BaseUsersAdminService from '@thzero/library/service/admin/users';

import UserData from '../../common/data/user';

class UsersAdminService extends BaseUsersAdminService {
	_initializeData() {
		return new UserData();
	}
}

export default UsersAdminService;

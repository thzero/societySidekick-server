import SharedConstants from '../common/constants';

import FirebaseAuthAdminService from '@thzero/library_server_firebase/auth';

class AuthService extends FirebaseAuthAdminService {
	_defaultClaims() {
		return SharedConstants.Roles.User;
	}
}

export default AuthService;

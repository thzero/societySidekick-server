import FirebaseAuthAdminService from '@thzero/library/service_auth_firebase';

class AuthService extends FirebaseAuthAdminService {
	_defaultClaims() {
		return SharedConstants.Roles.User;
	}

	_initConfig() {
		return require('../../config/serviceAccountKey.json');
	}
}

export default AuthService;

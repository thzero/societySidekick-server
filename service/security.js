import Utility from '@thzero/library_common/utility';

import BaseSecurityService from '@thzero/library/service/baseSecurity';

import securityUser from '../common/security/user'
import securityAdmin from '../common/security/admin'

class SecurityService extends BaseSecurityService {
	constructor() {
		super();

		this._enforcer = null;
	}

	_initModel() {
		return Utility.merge2(securityUser.options, securityAdmin.options);
	}
}

export default SecurityService;

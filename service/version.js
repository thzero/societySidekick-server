const { version_major, version_minor, version_patch, version_date } = require('../package.json');

import VersionService from '@thzero/library/service/version';

class AppVersionService extends VersionService {
	async version(correlationId) {
		return this._generate(version_major, version_minor, version_patch, version_date);
	}
}

export default AppVersionService;

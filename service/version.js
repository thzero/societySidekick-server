import Constants from '../constants';

import VersionService from '@thzero/library/service/version';

class AppVersionService extends VersionService {
	async version(correlationId) {
		const response = this._initResponse();
		response.results = Constants.Version;
		return response;
	}
}

export default AppVersionService;

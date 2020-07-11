import BaseUserData from '@thzero/library/data/baseUser';

import UserSettings from './settingsUser';

class UserData extends BaseUserData {
	constructor() {
		super();
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;
	}

	_initUserSettings() {
		return new UserSettings();
	}
}

export default UserData;

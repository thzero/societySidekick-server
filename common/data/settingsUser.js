import BaseSettings from '@thzero/library/data/baseSettingsUser';

class Settings extends BaseSettings {
	constructor() {
		super();

		this.boons = {};
		this.characters = {};
		this.favorites = [];
		this.gameSystems = [];
		this.locations = [];
		this.scenarios = {
			additional: []
		};
	}
}

export default Settings;

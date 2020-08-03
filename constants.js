import SharedConstants from './common/constants';

const BaseKeys = {
	SERVICE_GAMESYSTEMS: 'serviceGameSystems.' ,
	SERVICE_GAMESYSTEMS_CHARACTERS: 'serviceGameSystemCharacters.',
	SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION: 'serviceGameSystemCharactersValidation.',
	SERVICE_GAMESYSTEMS_RULES: 'serviceGameSystemsRules.',
	SERVICE_GAMESYSTEMS_SCENARIOS: 'serviceGameSystemsScenarios.',
	SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION: 'serviceGameSystemsScenariosValidation.',
	SERVICE_GAMESYSTEMS_VALIDATION: 'serviceGameSystemsValidation.'
}

const Constants = {
	InjectorKeys: {
		// Admin Updates
		REPOSITORY_ADMIN_BOONS: 'repositoryAdminBoons',
		REPOSITORY_ADMIN_CLASSES: 'repositoryAdminClasses',
		REPOSITORY_ADMIN_EQUIPMENT: 'repositoryAdminEquipment',
		REPOSITORY_ADMIN_FACTIONS: 'repositoryAdminFactions',
		REPOSITORY_ADMIN_SCENARIOS: 'repositoryAdminScenarios',

		REPOSITORY_BOONS: 'repositoryBoons',
		REPOSITORY_CLASSES: 'repositoryClasses',
		REPOSITORY_CHARACTERS: 'repositoryCharacters',
		REPOSITORY_EQUIPMENT: 'repositoryEquipment',
		REPOSITORY_FACTIONS: 'repositoryFactions',
		REPOSITORY_GAMESYSTEMS: 'repositoryGameSystems',
		REPOSITORY_SCENARIOS: 'repositoryScenarios',
		REPOSITORY_SITE: 'repositorySite',
		REPOSITORY_CLEANUP: 'repositoryCleanup',

		// Admin Updates
		SERVICE_ADMIN_BOONS: 'serviceAdminBoons',
		SERVICE_ADMIN_CLASSES: 'serviceAdminClasses',
		SERVICE_ADMIN_EQUIPMENT: 'serviceAdminEquipment',
		SERVICE_ADMIN_FACTIONS: 'serviceAdminFactions',
		SERVICE_ADMIN_SCENARIOS: 'serviceAdminScenarios',
		SERVICE_BOONS: 'serviceBoons',
		SERVICE_CLASSES: 'serviceClasses',
		SERVICE_CHARACTERS: 'serviceCharacters',
		SERVICE_EQUIPMENT: 'serviceEquipment',
		SERVICE_FACTIONS: 'serviceFactions',
		SERVICE_GAMESYSTEMS: 'serviceGameSystems',

		// GameSystems Update
		// Pathfinder 2e
		SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_CHARACTERS + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_RULES + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_SCENARIOS_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_SCENARIOS + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_VALIDATION_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_VALIDATION + SharedConstants.GameSystems.Pathfinder2e.id,
		// Starfinder 1e
		SERVICE_GAMESYSTEMS_CHARACTERS_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_CHARACTERS + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_RULES + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_SCENARIOS_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_SCENARIOS + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_VALIDATION_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_VALIDATION + SharedConstants.GameSystems.Starfinder1e.id,

		SERVICE_GAMESYSTEMS_UTILITY: 'serviceGameSystemsUtility',

		SERVICE_LOGGER_PINO: 'serviceLoggerPino',
		SERVICE_SCENARIOS: 'serviceScenarios',
		SERVICE_SITE: 'serviceSite',
		SERVICE_VALIDATION: 'serviceValidation',
		SERVICE_CLEANUP: 'serviceCleanup'
	},
	Plans: {
		BASIC: '8YJC7o4XH8Rrv9wvESm7w4'
	},
	ValidationSchemaTypes: {
		BoonCreate: 'boonCreate',
		BoonUpdate: 'boonUpdate',
		CharacterBoonCreate: 'characterBoonCreate',
		CharacterBoonUpdate: 'characterBoonUpdate',
		CharacterDetailsUpdate: 'characterDetailsUpdate',
		CharacterInventoryCreate: 'characterInventoryCreate',
		CharacterInventoryUpdate: 'characterInventoryUpdate',
		CharacterScenarioCreate: 'characterScenarioCreate',
		CharacterScenarioUpdate: 'characterScenarioUpdate',
		ClassCreate: 'classCreate',
		ClassUpdate: 'classUpdate',
		FactionCreate: 'factionCreate',
		FactionUpdate: 'factionUpdate',
		EquipmentCreate: 'equipmentCreate',
		EquipmentUpdate: 'equipmentUpdate',
		ScenarioCreate: 'scenarioCreate',
		ScenarioSearch: 'scenarioSearch',
		ScenarioUpdate: 'scenarioUpdate',
		UserSettingsSchema: 'userSettings'
	}
}

export default Constants;
import Constants from '../../../constants';

import CharacterGameSystemCharacterService from '../../service/character';

import Pathfinder2eInventoryCharacter from '../../../common/gameSystems/pathfinder2e/data/character';
import Pathfinder2eInventory from '../../../common/gameSystems/pathfinder2e/data/characterInventory';
import Pathfinder2eCharacterBoon from '../../../common/gameSystems/pathfinder2e/data/characterBoon';
import Pathfinder2eCharacterScenario from '../../../common/gameSystems/pathfinder2e/data/characterScenario';

class Pathfinder2eCharacterGameSystemCharacterService extends CharacterGameSystemCharacterService {
	calculateScenario(character, scenario) {
		this_serviceRules.calculateScenario(scenario);
		scenario.level = this_serviceRules.calculateScenarioLevel(character, scenario);
	}

	deleteBoon(character, boonId) {
		if (character.boonAdvancedId == boonId)
			character.boonAdvancedId = null;
		if (character.boonFactionId == boonId)
			character.boonFactionId = null;
		if (character.boonGeneric1Id == boonId)
			character.boonGeneric1Id = null;
		if (character.boonGeneric2Id == boonId)
			character.boonGeneric2Id = null;
		if (character.boonGeneric3Id == boonId)
			character.boonGeneric3Id = null;
	}

	updateBoon(boon, character, requestedBoon) {
		super.updateBoon(boon, character, requestedBoon);
	}

	updateDetails(character, details) {
		const response = super.updateDetails(character, details);
		if (!response.success)
			return response;

		character.archetypeId = details.archetypeId;
		character.boonAdvancedId = details.boonAdvancedId,
		character.boonFactionId = details.boonFactionId,
		character.boonGeneric1Id = details.boonGeneric1Id,
		character.boonGeneric2Id = details.boonGeneric2Id,
		character.boonGeneric3Id = details.boonGeneric3Id,
		character.classId = details.classId;
		character.factionId = details.factionId;
		character.number = details.number;
		return this._success();
	}

	updateScenario(scenario, character, requestedScenario) {
		super.updateScenario(scenario, character, requestedScenario);

		this._updateScenarioBoons(character, requestedScenario.boon1Id, scenario.boon1Id);
		this._updateScenarioBoons(character, requestedScenario.boon2Id, scenario.boon2Id);

		scenario.achievementPointsEarned = requestedScenario.achievementPointsEarned;
		scenario.achievementPointsSpent = requestedScenario.achievementPointsSpent;
		scenario.boon1Id = requestedScenario.boon1Id;
		scenario.boon2Id = requestedScenario.boon2Id;
		scenario.downtimePointsEarned = requestedScenario.downtimePointsEarned;
		scenario.downtimePointsSpent = requestedScenario.downtimePointsSpent;
		scenario.experiencePointsEarned = requestedScenario.experiencePointsEarned;
		scenario.fameFactionId = requestedScenario.fameFactionId;
		scenario.fameEarned = requestedScenario.fameEarned;
		scenario.fameSpent = requestedScenario.fameSpent;
		scenario.reputationFactionId = requestedScenario.reputationFactionId;
		scenario.reputationEarned = requestedScenario.reputationEarned;
		scenario.reputationAdditionalFactionId = requestedScenario.reputationAdditionalFactionId;
		scenario.reputationAdditionalEarned = requestedScenario.reputationAdditionalEarned;
		scenario.scenarioAdvancementSpeed = requestedScenario.scenarioAdvancementSpeed;
		scenario.scenarioAdventure = requestedScenario.scenarioAdventure;
		scenario.scenarioEvent = requestedScenario.scenarioEvent;
	}

	_initializeBoon() {
		return new Pathfinder2eCharacterBoon();
	}

	_initializeCharacter() {
		return new Pathfinder2eInventoryCharacter();
	}

	_initializeInventory() {
		return new Pathfinder2eInventory();
	}

	_initializeScenario() {
		return new Pathfinder2eCharacterScenario();
	}

	_initializeRules() {
		return this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
	}

	_updateScenarioBoons(character, requestedScenarioBoonId, scenarioBoonId) {
		if (requestedScenarioBoonId === scenarioBoonId)
			return;

		if (character.boonAdvancedId === scenarioBoonId)
			character.boonAdvancedId = null;
		if (character.boonFactionId === scenarioBoonId)
			character.boonFactionId = null;
		if (character.boonGeneric1Id === scenarioBoonId)
			character.boonGeneric1Id = null;
		if (character.boonGeneric2Id === scenarioBoonId)
			character.boonGeneric2Id = null;
		if (character.boonGeneric3Id === scenarioBoonId)
			character.boonGeneric3Id = null;
	}
}

export default Pathfinder2eCharacterGameSystemCharacterService;

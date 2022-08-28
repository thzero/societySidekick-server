import Constants from '../../../constants.js';

import CharacterGameSystemsService from '../../service/character.js';

import Pathfinder2eInventoryCharacter from '../../../common/gameSystems/pathfinder2e/data/character.js';
import Pathfinder2eInventory from '../../../common/gameSystems/pathfinder2e/data/characterInventory.js';
import Pathfinder2eCharacterBoon from '../../../common/gameSystems/pathfinder2e/data/characterBoon.js';
import Pathfinder2eCharacterScenario from '../../../common/gameSystems/pathfinder2e/data/characterScenario.js';

class Pathfinder2eCharacterGameSystemsService extends CharacterGameSystemsService {
	calculateScenario(correlationId, character, scenario) {
		this_serviceRules.calculateScenario(correlationId, scenario);
		scenario.level = this_serviceRules.calculateScenarioLevel(correlationId, character, scenario);
	}

	deleteBoon(correlationId, character, boonId) {
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

	updateBoon(correlationId, boon, character, requestedBoon) {
		super.updateBoon(correlationId, boon, character, requestedBoon);
	}

	updateDetails(correlationId, character, details) {
		const response = super.updateDetails(correlationId, character, details);
		if (this._hasFailed(response))
			return response;

		character.archetypeIds = details.archetypeIds;
		character.boonAdvancedId = details.boonAdvancedId,
		character.boonFactionId = details.boonFactionId,
		character.boonGeneric1Id = details.boonGeneric1Id,
		character.boonGeneric2Id = details.boonGeneric2Id,
		character.boonGeneric3Id = details.boonGeneric3Id,
		character.classId = details.classId;
		character.factionId = details.factionId;
		character.number = details.number;
		return this._success(correlationId);
	}

	updateScenario(correlationId, scenario, character, requestedScenario) {
		super.updateScenario(correlationId, scenario, character, requestedScenario);

		this._updateScenarioBoons(correlationId, character, requestedScenario.boon1Id, scenario.boon1Id);
		this._updateScenarioBoons(correlationId, character, requestedScenario.boon2Id, scenario.boon2Id);

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

	_updateScenarioBoons(correlationId, character, requestedScenarioBoonId, scenarioBoonId) {
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

export default Pathfinder2eCharacterGameSystemsService;

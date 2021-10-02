import Constants from '../../../constants'

import CharacterGameSystemsService from '../../service/character';

import Stafinder1eCharacter from '../../../common/gameSystems/starfinder1e/data/character';
import Stafinder1eInventory from '../../../common/gameSystems/starfinder1e/data/characterInventory'
import Stafinder1eCharacterBoon from '../../../common/gameSystems/starfinder1e/data/characterBoon'
import Stafinder1eCharacterScenario from '../../../common/gameSystems/starfinder1e/data/characterScenario'

class Starfinder1eCharacterGameSystemsService extends CharacterGameSystemsService {
	calculateScenario(correlationId, character, scenario) {
		this._serviceRules.calculateScenario(correlationId, scenario);
		scenario.level = this_serviceRules.calculateScenarioLevel(correlationId, character, scenario);
	}

	updateBoon(correlationId, boon, character, requestedBoon) {
		super.updateBoon(boon, character, requestedBoon);
	}

	updateDetails(correlationId, character, details) {
		const response = super.updateDetails(correlationId, character, details);
		if (this._hasFailed(response))
			return response;

		character.boonAllyId = details.boonAllyId,
		character.boonFactionId = details.boonFactionId,
		character.boonPersonalId = details.boonPersonalId,
		character.boonPromoId = details.boonPromoId,
		character.boonSocialId = details.boonSocialId,
		character.boonStarshipId = details.boonStarshipId,
		character.factionId = details.factionId;
		character.number = details.number;
		character.themeId = details.themeId;
		return this._success(correlationId);
	}

	updateScenario(correlationId, scenario, character, requestedScenario) {
		super.updateScenario(correlationId, scenario, character, requestedScenario);

		this._updateScenarioBoons(correlationId, character, requestedScenario.boon1Id, scenario.boon1Id);
		this._updateScenarioBoons(correlationId, character, requestedScenario.boon2Id, scenario.boon2Id);

		scenario.boon1Id = requestedScenario.boon1Id;
		scenario.boon2Id = requestedScenario.boon2Id;
		scenario.classId = requestedScenario.classId;
		scenario.experiencePointsEarned = requestedScenario.experiencePointsEarned;
		scenario.fameFactionId = requestedScenario.fameFactionId;
		scenario.fameEarned = requestedScenario.fameEarned;
		scenario.fameSpent = requestedScenario.fameSpent;
		scenario.reputationEarned = requestedScenario.reputationEarned;
		scenario.scenarioAdvancementSpeed = requestedScenario.scenarioAdvancementSpeed;
		scenario.scenarioEvent = requestedScenario.scenarioEvent;
	}

	_initializeBoon() {
		return new Stafinder1eCharacterBoon();
	}

	_initializeCharacter() {
		return new Stafinder1eCharacter();
	}

	_initializeInventory() {
		return new Stafinder1eInventory();
	}

	_initializeScenario() {
		return new Stafinder1eCharacterScenario();
	}

	_initializeRules() {
		return this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
	}

	_updateScenarioBoons(correlationId, character, requestedScenarioBoonId, scenarioBoonId) {
		if (requestedScenarioBoonId === scenarioBoonId)
			return;

		if (character.boonAllyId === scenarioBoonId)
			character.boonAllyId = null;
		if (character.boonFactionId === scenarioBoonId)
			character.boonFactionId = null;
		if (character.boonPersonalId === scenarioBoonId)
			character.boonPersonalId = null;
		if (character.boonPromoId === scenarioBoonId)
			character.boonPromoId = null;
		if (character.boonSocialId === scenarioBoonId)
			character.boonSocialId = null;
		if (character.boonStarshipId === scenarioBoonId)
			character.boonStarshipId = null;
	}
}

export default Starfinder1eCharacterGameSystemsService;

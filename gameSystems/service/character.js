import Service from '@thzero/library_server/service/index';

class CharacterGameSystemsService extends Service {
	constructor() {
		super();

		this._serviceRules = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceRules = this._initializeRules();
	}

	async calculate(correlationId, character, user) {
		await this._serviceRules.calculateCharacter(correlationId, character, user);
		return this._success(correlationId);
	}

	calculateScenario(correlationId, scenario) {
	}

	initializeBoon(boon, requestedBoon) {
		if (!boon) {
			boon = this._initializeBoon();
			boon.gameSystemId = requestedBoon.gameSystemId;
		}

		return boon;
	}

	initializeCharacter() {
		return this._initializeCharacter()
	}

	initializeInventory(inventory, requestedInventory) {
		if (!inventory) {
			inventory = this._initializeInventory();
			inventory.gameSystemId = requestedInventory.gameSystemId;
		}

		return inventory;
	}

	initializeScenario(scenario, requestedScenario) {
		if (!scenario) {
			scenario = this._initializeScenario();
			scenario.gameSystemId = requestedScenario.gameSystemId;
		}

		return scenario;
	}

	updateBoon(correlationId, boon, character, requestedBoon) {
		boon.boonId = requestedBoon.boonId;
		boon.gameSystemId = requestedBoon.gameSystemId;
		boon.locationId = requestedBoon.locationId;
		boon.timestamp = requestedBoon.timestamp;
		boon.used = requestedBoon.used;
	}

	updateDetails(correlationId, character, details) {
		character.name = details.name.trim();
		if (!details.name)
			return this._error('CharacterGameSystemsService', 'updateDetails', 'Empty name after trim.', null, null, null, correlationId);

		character.tagLine = details && details.tagLine ? details.tagLine.trim() : null;
		character.status = details.status;
		return this._success(correlationId);
	}

	updateInventory(correlationId, inventory, requestedInventory) {
		inventory.boughtScenarioId = requestedInventory.boughtScenarioId;
		inventory.item = requestedInventory.item;
		inventory.itemId = requestedInventory.itemId;
		inventory.quantity = requestedInventory.quantity;
		inventory.soldScenarioId = requestedInventory.soldScenarioId;
		inventory.used = requestedInventory.used;
		inventory.usedScenarioId = requestedInventory.usedScenarioId;
		inventory.total = this._serviceRules.calculateItemTotal(correlationId, inventory.quantity, inventory.value);
		inventory.value = requestedInventory.value;
	}

	updateScenario(correlationId, scenario, character, requestedScenario) {
		scenario.currencyBought = requestedScenario.currencyBought;
		scenario.currencyEarned = requestedScenario.currencyEarned;
		scenario.currencyIncomeEarned = requestedScenario.currencyIncomeEarned;
		scenario.currencySpendable = requestedScenario.currencySpendable;
		scenario.currencySpent = requestedScenario.currencySpent;
		scenario.gameSystemId = requestedScenario.gameSystemId;
		scenario.locationId = requestedScenario.locationId;
		scenario.order = requestedScenario.order;
		scenario.scenarioId = requestedScenario.scenarioId;
		scenario.scenarioParticipant = requestedScenario.scenarioParticipant;
		scenario.scenarioStatus = requestedScenario.scenarioStatus;
		scenario.timestamp = requestedScenario.timestamp;
	}

	_initializeRules() {
		return null;
	}
}

export default CharacterGameSystemsService;

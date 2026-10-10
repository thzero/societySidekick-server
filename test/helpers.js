import '@thzero/library_common/utility/string.js';

import LibraryCommonServiceConstants from '@thzero/library_common_service/constants.js';

import Constants from '../constants.js';
import SharedConstants from '../common/constants.js';

import Response from '@thzero/library_common/response/index.js';

import JoiValidationService from '../service/validation/joi/index.js';

import GameSystemsUtilityService from '../gameSystems/service/utility.js';

import GameSystemsPathfinder2eService from '../gameSystems/pathfinder2e/service/index.js';
import GameSystemsCharacterPathfinder2eService from '../gameSystems/pathfinder2e/service/character.js';
import GameSystemsCharacterValidationPathfinder2eService from '../gameSystems/pathfinder2e/service/validation/joi/character.js';
import GameSystemsRulesPathfinder2eService from '../common/gameSystems/pathfinder2e/service/rules.js';
import GameSystemsScenarioPathfinder2eService from '../gameSystems/pathfinder2e/service/scenario.js';
import GameSystemsScenarioValidationPathfinder2eService from '../gameSystems/pathfinder2e/service/validation/joi/scenario.js';
import GameSystemsValidationPathfinder2eService from '../gameSystems/pathfinder2e/service/validation/joi/index.js';

import GameSystemsStarfinder1eService from '../gameSystems/starfinder1e/service/index.js';
import GameSystemsCharacterStarfinder1eService from '../gameSystems/starfinder1e/service/character.js';
import GameSystemsCharacterValidationStarfinder1eService from '../gameSystems/starfinder1e/service/validation/joi/character.js';
import GameSystemsRulesStarfinder1eService from '../common/gameSystems/starfinder1e/service/rules.js';
import GameSystemsScenarioStarfinder1eService from '../gameSystems/starfinder1e/service/scenario.js';
import GameSystemsScenarioValidationStarfinder1eService from '../gameSystems/starfinder1e/service/validation/joi/scenario.js';
import GameSystemsValidationStarfinder1eService from '../gameSystems/starfinder1e/service/validation/joi/index.js';

// Swallows everything the services log, so test output stays readable.
export const logger = {
	debug() {},
	error() {},
	exception() {},
	info() {},
	isDebugEnabled() { return false; },
	warn() {},
	warn2() {}
};

export const validation = new JoiValidationService();
validation._logger = logger;

export function injector(services) {
	const map = {
		[LibraryCommonServiceConstants.InjectorKeys.SERVICE_CONFIG]: {},
		[LibraryCommonServiceConstants.InjectorKeys.SERVICE_LOGGER]: logger,
		[LibraryCommonServiceConstants.InjectorKeys.SERVICE_VALIDATION]: validation,
		...services
	};
	return {
		getService(key) {
			return map[key] ?? null;
		}
	};
}

// The game system services as boot/plugins/fastify/api.js registers them,
// initialized against one injector. Every service is created before any is
// initialized because several look each other up in init.
export async function gameSystems(services = {}) {
	const map = {
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_UTILITY]: new GameSystemsUtilityService(),

		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_PATHFINDER_2E]: new GameSystemsCharacterPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_PATHFINDER_2E]: new GameSystemsCharacterValidationPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E]: new GameSystemsPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E]: new GameSystemsRulesPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_PATHFINDER_2E]: new GameSystemsScenarioPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_PATHFINDER_2E]: new GameSystemsScenarioValidationPathfinder2eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_PATHFINDER_2E]: new GameSystemsValidationPathfinder2eService(),

		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_STARFINDER_1E]: new GameSystemsCharacterStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_CHARACTERS_VALIDATION_STARFINDER_1E]: new GameSystemsCharacterValidationStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E]: new GameSystemsRulesStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_STARFINDER_1E]: new GameSystemsScenarioStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_SCENARIOS_VALIDATION_STARFINDER_1E]: new GameSystemsScenarioValidationStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E]: new GameSystemsStarfinder1eService(),
		[Constants.InjectorKeys.SERVICE_GAMESYSTEMS_VALIDATION_STARFINDER_1E]: new GameSystemsValidationStarfinder1eService(),

		...services
	};
	const shared = injector(map);
	for (const service of Object.values(map)) {
		if (service && service.init)
			await service.init(shared);
	}
	return { injector: shared, services: map };
}

// A fake whose methods record every call and answer with the given handler,
// or with an empty success when there is none.
export function fake(handlers = {}) {
	const calls = {};
	return new Proxy({ calls }, {
		get(target, name) {
			if (name in target)
				return target[name];
			return async (...args) => {
				(calls[name] ??= []).push(args);
				const handler = handlers[name];
				return handler ? handler(...args) : Response.success(args[0]);
			};
		}
	});
}

export const success = (results) => Response.success('test', results);

export const gameSystemIds = {
	pathfinder2e: SharedConstants.GameSystems.Pathfinder2e.id,
	starfinder1e: SharedConstants.GameSystems.Starfinder1e.id
};

// Ids pass the _id schema: 20 to 30 of letters, digits, dash and underscore.
export const id = (name) => (name + '_'.repeat(20)).substring(0, 22);

export const user = { id: id('user'), settings: { gameSystems: [] } };

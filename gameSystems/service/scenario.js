import Service from '@thzero/library_server/service/index.js';

class ScenarioGameSystemsService extends Service {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default ScenarioGameSystemsService;

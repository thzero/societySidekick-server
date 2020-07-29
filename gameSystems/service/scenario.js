import Service from '@thzero/library_server/service/index';

class ScenarioGameSystemsService extends Service {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default ScenarioGameSystemsService;

import Service from '@thzero/library_server/service/index';

class ScenarioGameSystemScenarioService extends Service {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default ScenarioGameSystemScenarioService;

import Service from '@thzero/library/service/index';

class ScenarioGameSystemScenarioService extends Service {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default ScenarioGameSystemScenarioService;

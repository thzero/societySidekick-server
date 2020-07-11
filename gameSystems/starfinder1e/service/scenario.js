import ScenarioGameSystemScenarioService from '../../service/scenario';

class Starfinder1eScenarioGameSystemScenarioService extends ScenarioGameSystemScenarioService {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default Starfinder1eScenarioGameSystemScenarioService;

import ScenarioGameSystemsService from '../../service/scenario';

class Starfinder1eScenarioGameSystemsService extends ScenarioGameSystemsService {
	iniializeResult(result, scenario, characterScenario) {
		result.scenarioParticipant = characterScenario.scenarioParticipant
	}
}

export default Starfinder1eScenarioGameSystemsService;

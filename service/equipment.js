import Constants from '../constants';

import Service from '@thzero/library_server/service/index';
class EquipmentService extends Service {
	constructor() {
		super();

		this._repositoryEquipment = null;
	}

	async init(injector) {
		await super.init(injector);

		this._repositoryEquipment = this._injector.getService(Constants.InjectorKeys.REPOSITORY_EQUIPMENT);
	}

	async search(correlationId, gameSystemId, search) {
		const validationGameSystemIdResponse = this._validateId(correlationId, gameSystemId, 'gameSystemId');
		if (this._hasFailed(validationGameSystemIdResponse))
			return validationGameSystemIdResponse;

		const respositoryResponse = await this._repositoryEquipment.search(correlationId, gameSystemId, search);
		return respositoryResponse;
	}
}

export default EquipmentService;

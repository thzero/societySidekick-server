import Joi from 'joi';

import BaseNewsJoiBaseValidationService from '@thzero/library_server_validation_joi/news';

class NewsJoiBaseValidationService extends BaseNewsJoiBaseValidationService {
	getNewsSchema() {
		const validation = super.getNewsSchema();
		return validation.concat(Joi.object({
			gameSystemId: this._id.allow(null),
		}));
	}

	getNewsUpdateSchema() {
		const validation = super.getNewsUpdateSchema();
		return validation.concat(Joi.object({
			gameSystemId: this._id.allow(null),
		}));
	}
}

export default NewsJoiBaseValidationService;

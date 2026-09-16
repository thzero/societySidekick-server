import Constants from '../../constants.js';

import PubSubMongoRepository from '@thzero/library_server_repository_mongo/pubSub.js';

class PubSubRepository extends PubSubMongoRepository {
	constructor() {
		super();

		this._servicePubSub = null;
	}

	async init(injector) {
		await super.init(injector);

		this._servicePubSub = this._injector.getService(Constants.InjectorKeys.SERVICE_PUBSUB);
	}

	async _getCollectionPubSub(correlationId) {
		// A change stream only surfaces majority committed writes, so at the default
		// w:1 a send() can report success for an insert a later election rolls back,
		// and that message is never delivered.
		return await this._getCollectionFromConfig(correlationId, this._collectionsConfig.getCollectionPubSub(correlationId), { writeConcern: { w: 'majority' } });
	}

	_getConfigPubSub(correlationId) {
		return this._collectionsConfig.getCollectionPubSub(correlationId);
	}

	async _listen(correlationId, message) {
		return await this._servicePubSub.perform(correlationId, message);
	}
}

export default PubSubRepository;

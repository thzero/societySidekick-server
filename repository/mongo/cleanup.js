import AppMongoRepository from './app';

import Utility from '@thzero/library_common/utility';

class CleanupMongoRepository extends AppMongoRepository {
	async cleanup(correlationId) {
		const response = this._initResponse();

		const collectionCharacters = await this._getCollectionCharacters();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let results = await this._fetchExtract(await this._find(collectionCharacters, { }), response);

			let id;
			let previousId;
			for (let item of results.data) {
				for (let item2 of item.scenarios) {
					id = Utility.generateShortId();
					previousId = item2.id;
					item2.id = id;

					if (item.inventory) {

						for (let item3 of item.inventory) {
							if (item3.boughtScenarioId === previousId)
								item3.boughtScenarioId = id;
							if (item3.soldScenarioId === previousId)
								item3.soldScenarioId = id;
							if (item3.usedScenarioId === previousId)
								item3.usedScenarioId = id;
						}

					}
				}

				if (item.inventory) {
					for (let item3 of item.inventory) {
						item3.id = Utility.generateShortId();
					}
				}

				let results4 = await collectionCharacters.replaceOne({ 'id': item.id }, item, {upsert: true});
				console.log(results4);
			}

			await this._transactionCommit(session);
			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}

	async cleanupBoons(correlationId) {
		const response = this._initResponse();

		const collectionBoons = await this._getCollectionBoons();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let collectionCharacters = await this._getCollectionCharacters();
			let results = await this._fetchExtract(await this._find(collectionBoons, { }), response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = Utility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionBoons.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'boonGeneric1Id' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric1Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'boonGeneric2Id' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric2Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'boonGeneric3Id' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric3Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.boon1Id' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.boon1Id === previousId)
								item3.boon1Id = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.boon2Id' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.boon2Id === previousId)
								item3.boon2Id = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(session);
			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}

	async cleanupClasses(correlationId) {
		const response = this._initResponse();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let collectionClasses = await this._getCollectionClasses();
			let collectionCharacters = await this._getCollectionCharacters();
			let results = await this._fetchExtract(await this._find(collectionClasses, { }), response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = Utility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionClasses.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'classId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.classId = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'archetypeId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.archetypeId = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(session);
			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}

	async cleanupFactions(correlationId) {
		const response = this._initResponse();

		const collectionFactions = await this._getCollectionFactions();
		const collectionCharacters = await this._getCollectionCharacters();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let results = await this._fetchExtract(await this._find(collectionFactions, { }), response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = Utility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionFactions.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'factionId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.factionId = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.fameFactionId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.fameFactionId === previousId)
								item3.fameFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.reputationFactionId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.reputationFactionId === previousId)
								item3.reputationFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.reputationAdditionalFactionId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.reputationAdditionalFactionId === previousId)
								item3.reputationAdditionalFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(session);
			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}


	async cleanupScenarios(correlationId) {
		const response = this._initResponse();

		const collectionScenarios = await this._getCollectionScenarios();
		const collectionCharacters = await this._getCollectionCharacters();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let results = await this._fetchExtract(await this._find(collectionScenarios, { }), response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = Utility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionScenarios.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(await this._find(collectionCharacters, {'scenarios.scenarioId' : previousId }), response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.scenarioId === previousId)
								item3.scenarioId = id;
						}
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(session);

			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}

	async cleanupScenarios2(correlationId) {
		const response = this._initResponse();

		const collectionCharacters = await this._getCollectionCharacters();
		const client = await this._getClient();
		const session = await this._transactionInit(client);
		try {
			await this._transactionStart(session);

			let results = await this._fetchExtract(await this._find(collectionCharacters, { }), response);

			let id;
			let previousId;
			for (let item of results.data) {
				for (let item2 of item.scenarios) {
					id = Utility.generateShortId();
					previousId = item2.id;
					item2.id = id;

					if (item.inventory) {

						for (let item3 of item.inventory) {
							if (item3.boughtScenarioId === previousId)
								item3.boughtScenarioId = id;
							if (item3.soldScenarioId === previousId)
								item3.soldScenarioId = id;
							if (item3.usedScenarioId === previousId)
								item3.usedScenarioId = id;
						}

					}
				}

				if (item.inventory) {
					for (let item3 of item.inventory) {
						item3.id = Utility.generateShortId();
					}
				}

				let results4 = await collectionCharacters.replaceOne({ 'id': item.id }, item, {upsert: true});
				console.log(results4);
			}

			await this._transactionCommit(session);
			return response;
		}
		catch (err) {
			return this._transactionAbort(session, null, err);
		}
		finally {
			await this._transactionEnd(session);
		}
	}
}

export default CleanupMongoRepository;

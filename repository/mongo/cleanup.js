import AppMongoRepository from './app';

import LibraryUtility from '@thzero/library_common/utility';

class CleanupMongoRepository extends AppMongoRepository {
	async cleanup(correlationId) {
		const response = this._initResponse(correlationId);

		const collectionCharacters = await this._getCollectionCharacters(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let results = await this._fetchExtract(correlationId, collectionCharacters, {}, response);

			let id;
			let previousId;
			for (let item of results.data) {
				for (let item2 of item.scenarios) {
					id = LibraryUtility.generateShortId();
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
						item3.id = LibraryUtility.generateShortId();
					}
				}

				let results4 = await collectionCharacters.replaceOne({ 'id': item.id }, item, {upsert: true});
				console.log(results4);
			}

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async cleanupBoons(correlationId) {
		const response = this._initResponse(correlationId);

		const collectionBoons = await this._getCollectionBoons(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let collectionCharacters = await this._getCollectionCharacters(correlationId);
			let results = await this._fetchExtract(correlationId, collectionBoons, {}, response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = LibraryUtility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionBoons.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'boonGeneric1Id' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric1Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'boonGeneric2Id' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric2Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'boonGeneric3Id' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.boonGeneric3Id = id;
						let results4 = await collectionCharacters.replaceOne({ 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.boon1Id' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.boon1Id === previousId)
								item3.boon1Id = id;
						}
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.boon2Id' : previousId }, response);
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

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async cleanupClasses(correlationId) {
		const response = this._initResponse(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let collectionClasses = await this._getCollectionClasses(correlationId);
			let collectionCharacters = await this._getCollectionCharacters(correlationId);
			let results = await this._fetchExtract(correlationId, collectionClasses, { }, response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = LibraryUtility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionClasses.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'classId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.classId = id;
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'archetypeId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.archetypeId = id;
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async cleanupFactions(correlationId) {
		const response = this._initResponse(correlationId);

		const collectionFactions = await this._getCollectionFactions(correlationId);
		const collectionCharacters = await this._getCollectionCharacters(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let results = await this._fetchExtract(correlationId, collectionFactions, { }, response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = LibraryUtility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionFactions.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'factionId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						item2.factionId = id;
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.fameFactionId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.fameFactionId === previousId)
								item3.fameFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.reputationFactionId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.reputationFactionId === previousId)
								item3.reputationFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.reputationAdditionalFactionId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.reputationAdditionalFactionId === previousId)
								item3.reputationAdditionalFactionId = id;
						}
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}


	async cleanupScenarios(correlationId) {
		const response = this._initResponse(correlationId);

		const collectionScenarios = await this._getCollectionScenarios(correlationId);
		const collectionCharacters = await this._getCollectionCharacters(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let results = await this._fetchExtract(correlationId, collectionScenarios, { }, response);

			let id;
			let previousId;
			let results2;
			for (let item of results.data) {
				id = LibraryUtility.generateShortId();
				previousId = item.id;
				item.id = id;

				let results3 = await collectionScenarios.replaceOne({ 'id': previousId }, item, {upsert: true});

				results2 = await this._fetchExtract(correlationId, collectionCharacters, {'scenarios.scenarioId' : previousId }, response);
				console.log(results2.data);
				if (results2.count > 0) {
					for (let item2 of results2.data) {
						for (let item3 of item2.scenarios) {
							if (item3.scenarioId === previousId)
								item3.scenarioId = id;
						}
						let results4 = await collectionCharacters.replaceOne(correlationId, { 'id': item2.id }, item2, {upsert: true});
						console.log(results4);
					}
				}
			}

			await this._transactionCommit(correlationId, session);

			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async cleanupScenarios2(correlationId) {
		const response = this._initResponse(correlationId);

		const collectionCharacters = await this._getCollectionCharacters(correlationId);
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			let results = await this._fetchExtract(await collectionCharacters, { }, response);

			let id;
			let previousId;
			for (let item of results.data) {
				for (let item2 of item.scenarios) {
					id = LibraryUtility.generateShortId();
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
						item3.id = LibraryUtility.generateShortId();
					}
				}

				let results4 = await collectionCharacters.replaceOne({ 'id': item.id }, item, {upsert: true});
				console.log(results4);
			}

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			return await this._transactionAbort(correlationId, session, null, err);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}
}

export default CleanupMongoRepository;

import AppMongoRepository from './app';

class CharactersMongoRepository extends AppMongoRepository {
	async create(correlationId, userId, character) {
		const response = this._initResponse(correlationId);

		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			const collection = await this._getCollectionCharacters(correlationId);

			const responseC = await this._create(correlationId, collection, userId, character);
			if (!responseC || !responseC.success)
				return await this._transactionAbort(correlationId, session, 'Unable to insert the value');

			response.results = character;

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			await this._transactionAbort(correlationId, session, null, err);
			return this._error('CharactersMongoRepository', 'create', null, err, null, null, correlationId);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async delete(correlationId, userId, characterId) {
		const response = this._initResponse(correlationId);

		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			const collection = await this._getCollectionCharacters(correlationId);

			const responseC = await this._delete(correlationId, collection, { $and: [ { 'userId' : userId }, { 'id': characterId } ] });
			if (!responseC || !responseC.success)
				return await this._transactionAbort(correlationId, session, 'Unable to delete the value');

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			await this._transactionAbort(correlationId, session, null, err);
			return this._error('CharactersMongoRepository', 'delete', null, err, null, null, correlationId);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async fetch(correlationId, userId, characterId) {
		const collection = await this._getCollectionCharacters(correlationId);
		const response = this._initResponse(correlationId);

		const query = [
			{
				$match: {
					$and: [ { 'userId' : userId }, { 'id': characterId } ]
				}
			},
			{
				$project: { '_id': 0 }
			}
		]

		response.results = await this._fetch(correlationId, await this._aggregate(correlationId, collection, query));

		response.success = response.results != null;
		return response;
	}

	async fetchNumber(correlationId, userId, gameSystemId) {
		const collection = await this._getCollectionCharacters(correlationId);
		const response = this._initResponse(correlationId);
		const cursor = await this._find(correlationId, collection, {
			$and: [ { 'userId' : userId }, { 'gameSystemId': gameSystemId } ]
		}, {
			'_id': 0,
			'number': 1
		});
		//response.results = await cursor.count() + 1;
		response.results = 0;
		const results = await cursor.toArray();
		for (const item of results) {
			if (item.number > response.results)
				response.results = Number(item.number);
		}
		response.results += 1;
		response.success = true;
		return response;
	}

	async listing(correlationId, userId, sections, gameSystemId) {
		const criteriaMatchAnd = [
			{ 'userId': userId }
		];
		if (gameSystemId)
			criteriaMatchAnd.push({ 'gameSystemId': gameSystemId });

		const queryF = { 'userId' : userId };
		const queryA = [
			// {
			// 	$match: { 'userId': userId }
			// }
			{
				$match: {
					$and: criteriaMatchAnd
				}
			}
		]

		return this._listing(correlationId, queryF, queryA, sections);
	}

	async listingFavorites(correlationId, userId, favorites) {
		const ids = [];
		for (const fav of favorites)
			ids.push(fav.id);
		const queryF = { 'userId': { $in: ids } }
		const queryA = [
			{
				$match: {
					$and: [
						{ 'userId': { $in: ids } }
					]
				}
			}
		]

		return this._listing(correlationId, queryF, queryA, { external: true });
	}

	async listingExternal(correlationId, userId, gameSystemId) {
		const queryF = { 'userId' : userId };
		const queryA = [
			{
				$match: {
					$and: [
						{ 'userId': userId },
						{ 'gameSystemId': gameSystemId }
					]
				}
			}
		]

		return this._listing(correlationId, queryF, queryA, { external: true });
	}

	async update(correlationId, userId, character) {
		const client = await this._getClient(correlationId);
		const session = await this._transactionInit(correlationId, client);
		try {
			await this._transactionStart(correlationId, session);

			const collection = await this._getCollectionCharacters(correlationId);
			const response = this._initResponse(correlationId);

			character.userId = userId;
			await this._update(correlationId, collection, userId, character.id, character);
			response.results = character;

			await this._transactionCommit(correlationId, session);
			return response;
		}
		catch (err) {
			await this._transactionAbort(correlationId, session, null, err);
			return this._error('CharactersMongoRepository', 'update', null, err, null, null, correlationId);
		}
		finally {
			await this._transactionEnd(correlationId, session);
		}
	}

	async valid(correlationId, userId, gameSystemId, characterId, name, number) {
		const collection = await this._getCollectionCharacters(correlationId);
		const response = this._initResponse(correlationId);
		const total = await collection.countDocuments({ $and: [ { 'userId' : userId }, { 'gameSystemId' : gameSystemId } ] });
		const countName = await collection.countDocuments({ $and: [ { $text : { $search : name } }, { 'id': { $ne: characterId } }, { 'userId' : userId }, { 'gameSystemId' : gameSystemId } ] });
		const countNumber = await collection.countDocuments({ $and: [ { 'number' : number }, { 'id': { $ne: characterId } }, { 'userId' : userId }, { 'gameSystemId' : gameSystemId } ] });
		response.results = { total: total, countName: countName, countNumber: countNumber };
		return response;
	}

	async _listing(correlationId, queryF, queryA, sections) {
		const collection = await this._getCollectionCharacters(correlationId);
		const response = this._initResponse(correlationId);

		if (sections) {
			let projection = null;
			if (sections.basics) {
				projection = {
					'_id': 0,
					'id': 1,
					'classId': 1,
					'classes': 1,
					'experiencePoints': 1,
					'experiencePointsToNextLevel': 1,
					'factionId': 1,
					'gameSystemId': 1,
					'level': 1,
					'name': 1,
					'number': 1,
					'status': 1
				};
			}

			if (sections.external) {
				projection = {
					'_id': 0,
					'id': 1,
					'classId': 1,
					'classes': 1,
					'experiencePoints': 1,
					'experiencePointsToNextLevel': 1,
					'factionId': 1,
					'gameSystemId': 1,
					'level': 1,
					'name': 1,
					'number': 1,
					'scenarios.gameSystemId': 1,
					'scenarios.boon1Id': 1,
					'scenarios.boon2Id': 1,
					'scenarios.locationId': 1,
					'scenarios.scenarioId': 1,
					'scenarios.scenarioParticipant': 1,
					'scenarios.scenarioStatus': 1,
					'scenarios.timestamp': 1,
					'status': 1,
					'userId': 1
				}
			}

			if (sections.listing) {
				projection = {
					'_id': 0,
					'id': 1,
					'classId': 1,
					'classes': 1,
					'experiencePoints': 1,
					'experiencePointsToNextLevel': 1,
					'factionId': 1,
					'gameSystemId': 1,
					'level': 1,
					'name': 1,
					'number': 1,
					'boons.gameSystemId': 1,
					'boons.boonId': 1,
					'boons.locationId': 1,
					'boons.scenarioId': 1,
					'boons.used': 1,
					'boons.timestamp': 1,
					'scenarios.gameSystemId': 1,
					'scenarios.boon1Id': 1,
					'scenarios.boon2Id': 1,
					'scenarios.locationId': 1,
					'scenarios.scenarioId': 1,
					'scenarios.scenarioParticipant': 1,
					'scenarios.scenarioStatus': 1,
					'scenarios.timestamp': 1,
					'status': 1,
					'userId': 1
				}
			}

			if (projection)
				queryA.push({ $project: projection });
		}

		response.results = await this._aggregateExtract(correlationId, await this._find(correlationId, collection, queryF), await this._aggregate(correlationId, collection, queryA), this._initResponseExtract(correlationId));
		return response;
	}
}

export default CharactersMongoRepository;

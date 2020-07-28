import NewsApiBootPlugin from '@thzero/library_server/boot/plugins/news';

import newsRepository from '@thzero/library_server_repository_mongo/news';

import newsService from '../../service/news';
import newsValidationService from '../../service/news/validation/joi';

class AppNewsApiBootPlugin extends NewsApiBootPlugin {
	_initRepositoriesNews() {
		return new newsRepository();
	}

	_initServicesNews() {
		return new newsService();
	}

	_initServicesNewsValidation() {
		return new newsValidationService();
	}
}

export default AppNewsApiBootPlugin;

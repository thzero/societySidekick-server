import BaseNewsAdminService from '@thzero/library/service/admin/news';

import NewsData from '../../common/data/news';

class NewsAdminService extends BaseNewsAdminService {
	_initializeData() {
		return new NewsData();
	}
}

export default NewsAdminService;

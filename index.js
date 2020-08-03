import Constants from './constants';

import AdminPlugin from './boot/plugins/admin/admin';
import NewsAdminPlugin from './boot/plugins/admin/news';
import UsersAdminPlugin from './boot/plugins/admin/users';

import ApiPlugin from './boot/plugins/api';
import NewsApiPlugin from './boot/plugins/news';
import UsersApiPlugin from './boot/plugins/users';

import BootMain from '@thzero/library_server/boot/main';

import usageMetricsRepository from '@thzero/library_server_repository_mongo/usageMetrics';

import pinoLoggerService from '@thzero/library_server_logger_pino';

class AppBootMain extends BootMain {
	_initRepositoriesUsageMetrics() {
		return new usageMetricsRepository();
	}

	_initServicesLoggers() {
		this._registerServicesLogger(Constants.InjectorKeys.SERVICE_LOGGER_PINO, new pinoLoggerService());
	}
}

(async function() {
	await (new AppBootMain()).start(ApiPlugin, NewsApiPlugin, UsersApiPlugin, AdminPlugin, NewsAdminPlugin, UsersAdminPlugin);
})();

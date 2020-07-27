import AdminPlugin from './boot/plugins/admin';
import ApiPlugin from './boot/plugins/api';

import BootMain from '@thzero/library/boot/main';

import usageMetricsRepository from '@thzero/library_repository_mongo/usageMetrics';

import loggerService from '@thzero/library_logger_pino';

class AppBootMain extends BootMain {
	_initRepositoriesUsageMetrics() {
		return new usageMetricsRepository();
	}

	_initServicesLogger() {
		return new loggerService();
	}

	_initServer(serverHttp) {
		console.log(this._appConfig);
		console.log('AUTH_API_KEY: ' + process.env.AUTH_API_KEY);
	}
}

(async function() {
	await (new AppBootMain()).start(ApiPlugin, AdminPlugin);
})();

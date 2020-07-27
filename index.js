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
}

(async function() {
	await (new AppBootMain()).start(ApiPlugin, AdminPlugin);
})();

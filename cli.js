import minimist from 'minimist';

import Utility from '@thzero/library/utility';

// https://timber.io/blog/creating-a-real-world-cli-app-with-node/

const { version } = require('./package.json');

const menus = {
	default: `
generates a short uuid
cli <options>

--number, -n ..... the number of ids to generate
--long, -l ....... generates a long uuid`,
};

const args = minimist(process.argv.slice(2));

let cmd = 'generate' || 'help';

if (args.version || args.v)
	cmd = 'version';

if (args.help || args.h)
	cmd = 'help';

let number = 1;
if (args.number || args.n)
	number = args.number || args.n;

let short = true;
if (args.long || args.l)
	short = false;

switch (cmd) {
	case 'generate':
		let result
		for (let i = 0; i < number; i++) {
			if (!short)
				result = Utility.generateId();
			else
				result = Utility.generateShortId();
			console.log(result);
		}
		break;

	case 'help':
		// require('./cmds/help')(args)
		console.log(menus.default)
		break;

	case 'version':
		console.log(`v${version}`)
		break;

	default:
		console.error(`"${cmd}" is not a valid command!`)
		break;
}

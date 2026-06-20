import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '../..');
const pnpmRoot = path.join(projectRoot, 'node_modules', '.pnpm');

const fail = (message) => {
    process.stderr.write(`${message}\n`);
    process.exit(1);
};

if (!fs.existsSync(pnpmRoot)) {
    fail('Vercel build check failed: node_modules/.pnpm was not found.');
}

const patchrightCorePackage = fs.readdirSync(pnpmRoot).find((entry) => entry.startsWith('patchright-core@'));

if (!patchrightCorePackage) {
    fail('Vercel build check failed: patchright-core was not installed.');
}

const browsersJson = path.join(pnpmRoot, patchrightCorePackage, 'node_modules', 'patchright-core', 'browsers.json');

if (!fs.existsSync(browsersJson)) {
    fail(`Vercel build check failed: missing ${path.relative(projectRoot, browsersJson)}.`);
}

process.stdout.write(`Vercel build check passed: found ${path.relative(projectRoot, browsersJson)}.\n`);

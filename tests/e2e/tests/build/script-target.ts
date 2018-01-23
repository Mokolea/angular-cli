import { expectFileToMatch } from '../../utils/fs';
import { ng } from '../../utils/process';
import { updateJsonFile } from '../../utils/project';
import { getGlobalVariable } from '../../utils/env';


export default function () {
  // TODO(architect): reenable, validate, then delete this test. It is now in devkit/build-webpack.
  return;

  // Skip this test in Angular 2, it had different bundles.
  if (getGlobalVariable('argv').ng2) {
    return Promise.resolve();
  }

  return Promise.resolve()
    .then(() => updateJsonFile('tsconfig.json', configJson => {
      const compilerOptions = configJson['compilerOptions'];
      compilerOptions['target'] = 'es2015';
    }))
    .then(() => ng('build', '--optimization-level', '1', '--output-hashing=none', '--vendor-chunk'))
    // Check class constructors are present in the vendor output.
    .then(() => expectFileToMatch('dist/vendor.js', /class \w{constructor\(\){/));
}

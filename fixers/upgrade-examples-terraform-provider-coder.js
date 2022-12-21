// Copyright © 2022 Geoffrey Huntley.
// The following code is covered by the MIT license.

const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.register = async (fixers) => {
  fixers[0].push({
    id: 'upgrade-examples-terraform-provider-coder',
    cmd: 'examples/update_template_versions.sh > /dev/null 2>&1',
    description: 'Upgrade terraform-provider-coder version of coder/coder examples',
  });
};

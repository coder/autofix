// Copyright © 2022 Geoffrey Huntley.
// The following code is covered by the MIT license.

const util = require('util');

exports.register = async (fixers) => {
  fixers[0].push({
    id: 'make-gen',
    cmd: 'make gen > /dev/null 2>&1',
    description: 'Fix generated files',
  });
};

# Autofix

Automatically fix all software bugs.


## Examples

Automatically fix bugs in the current directory:

```bash
autofix
```

Preview all the commands this would run, but don't actually do anything:

```bash
autofix --dry
```

Autofix bugs in a GitHub repository, commit fixes into separate branches, and automatically send pull requests (requires [gh](https://github.com/cli/cli)):

```bash
autofix --branches --pull-request
```

## Dependencies

- [gh](https://github.com/cli/cli)

## Command line options

```bash
autofix (DIRECTORY|REPOSITORY) [OPTIONS]
```

- [ ] `DIRECTORY`: Run autofix in a particular directory (defaults to `.`).
- [ ] `REPOSITORY`: Clone a Git repository, then run autofix in it.

OPTIONS:

- [x] `--dry`: Simulate without actually running any fix commands
- [x] `--branches`: Commit fixes of different types into different branches (e.g. `autofix-codespell`)
- [x] `--tiers=0,1,2`: Choose which types of bugs should be autofixed (see details about tiers below)
- [x] `--verbose`: Log additional information to the console (e.g. for troubleshooting `autofix` bugs)
- [x] `--push=REMOTE`: Push fixes to a given GitHub remote (e.g. your GitHub username)
- [x] `--pull-request`: Automatically open pull requests with pushed commits (requires [hub](https://github.com/github/hub), implies `--push=origin` if unspecified)
- [x] `--branch-suffix=SUFFIX`: Add a common suffix to generated branch names (i.e. `autofix-codespell-SUFFIX`)
- [x] `--signoff`: Use Git's `--signoff` (or `-s`) feature when creating commits

## Types of bugs that can be fixed

Tier 0 (no rework needed):
- [x] Remove trailing whitespace (uses `git`, `xargs` and `sed`)
- [x] Applies `make fmt` on the coder/coder codebase.
- [x] Update version of terraform in the coder/coder codebase.
- [x] Update Git submodules

Tier 1 (some rework might be needed):

Tier 2 (experimental, use with caution):

Tier 3 (you probably don't want to run these):
- [ ] TODO

## Custom fixers

You can also implement your own fixers (similar to the ones found in the [./fixers/](./fixers/) directory) and commit them to your repository under a `.autofix/fixers/` directory. Autofix will automatically pick them up; run them on your codebase; and commit new fixes when relevant.

# Changelog

## 1.4.0 (2023-04-18)

### Refactor

* Use `chokidar` as file watcher to fix silent preprocessor failures found in
  [#45](https://github.com/mammadataei/cypress-vite/issues/45). This was copied
  from the changes proposed by MetRonnie in [PR
  #50](https://github.com/mammadataei/cypress-vite/pull/50/commits)
* Removed `husky` to unblock publishing since this fork is only temporary until [PR
  #50](https://github.com/mammadataei/cypress-vite/pull/50/commits) is merged
  and released


## [1.3.0](https://github.com/mammadataei/cypress-vite/compare/v1.2.1...v1.3.0) (2022-12-24)

### Features

* add support for Vite 4 and Cypress 12 ([#29](https://github.com/mammadataei/cypress-vite/issues/29)) ([00dbb75](https://github.com/mammadataei/cypress-vite/commit/00dbb75efdff30157f721f4f32ba5715c9c23b67))

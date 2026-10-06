install:
	npm ci

gendiff:
	node bin/gendiff.js

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

lint:
	npm run lint

.PHONY: install gendiff test test-watch test-coverage lint

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import genDiff from '../src/index.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8').trimEnd();

const inputPairs = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
];

describe.each(inputPairs)('genDiff(%s, %s)', (filename1, filename2) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);

  test('uses stylish by default', () => {
    expect(genDiff(filepath1, filepath2)).toBe(readFixture('expected-stylish.txt'));
  });

  test('formats as plain text', () => {
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(readFixture('expected-plain.txt'));
  });

  test('formats as JSON', () => {
    const result = JSON.parse(genDiff(filepath1, filepath2, 'json'));
    expect(result).toEqual(expect.any(Array));
    expect(result.map(({ key }) => key)).toEqual(['common', 'group1', 'group2', 'group3']);
  });
});

import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const extension = path.extname(absolutePath).slice(1);
  const content = fs.readFileSync(absolutePath, 'utf8');
  return parse(content, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};

export default genDiff;

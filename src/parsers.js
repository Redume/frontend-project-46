import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format.toLowerCase()) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported data format: ${format}`);
  }
};

export default parse;

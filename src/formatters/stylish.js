const spacesCount = 4;
const markerOffset = 2;

const stringify = (value, depth) => {
  if (value === null || typeof value !== 'object') {
    return String(value);
  }

  const indent = ' '.repeat((depth + 1) * spacesCount);
  const closingIndent = ' '.repeat(depth * spacesCount);
  const lines = Object.entries(value)
    .map(([key, nestedValue]) => `${indent}${key}: ${stringify(nestedValue, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const indent = ' '.repeat(depth * spacesCount - markerOffset);
    const plainIndent = ' '.repeat(depth * spacesCount);

    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${plainIndent}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${plainIndent}${node.key}: ${stringify(node.value, depth)}`;
        case 'updated':
          return [
            `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
            `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
          ];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

    const closingIndent = ' '.repeat((depth - 1) * spacesCount);
    return `{\n${lines.join('\n')}\n${closingIndent}}`;
  };

  return iter(tree, 1);
};

export default stylish;

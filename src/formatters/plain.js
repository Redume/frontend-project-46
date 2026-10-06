const stringify = (value) => {
  if (value !== null && typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (nodes, path) => nodes.flatMap((node) => {
    const property = [...path, node.key].join('.');

    switch (node.type) {
      case 'nested':
        return iter(node.children, [...path, node.key]);
      case 'added':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'updated':
        return `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }).join('\n');

  return iter(tree, []);
};

export default plain;

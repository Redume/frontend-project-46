const isPlainObject = (value) => value !== null
  && typeof value === 'object'
  && !Array.isArray(value);

const buildTree = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  return keys.map((key) => {
    const hasFirst = Object.hasOwn(data1, key);
    const hasSecond = Object.hasOwn(data2, key);

    if (!hasFirst) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!hasSecond) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }
    if (Object.is(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
};

export default buildTree;

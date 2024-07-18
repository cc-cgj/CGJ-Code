export function arrayToTreeMap(
  nodes,
  idKey = "id",
  parentKey = "parentId",
  parentId = null
) {
  const map = new Map(
    nodes.map((node) => [node[idKey], { ...node, children: [] }])
  );
  const tree = [];
  for (const node of map.values()) {
    if (node[parentKey] === parentId) {
      tree.push(node);
    } else {
      map.get(node[parentKey]).children.push(node);
    }
  }
  return tree;
}

export function arrayToTree(
  nodes,
  idKey = "id",
  parentKey = "parentId",
  parentId = null,
  maxDepth = Infinity,
  currentDepth = 0
) {
  if (currentDepth >= maxDepth) {
    return [];
  }

  const tree = nodes
    .filter((node) => node[parentKey] === parentId)
    .map((node) => ({
      ...node,
      children: arrayToTree(
        nodes,
        idKey,
        parentKey,
        node[idKey],
        maxDepth,
        currentDepth + 1
      ),
    }));

  return tree;
}

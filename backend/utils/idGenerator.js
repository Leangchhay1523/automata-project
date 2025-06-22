export function transformId(prefix, oldId = "") {
  if (oldId && oldId.length > 1) {
    return `${prefix}${oldId.slice(1)}`;
  }
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${rand}`;
}

export function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }

  if (obj !== null && typeof obj === 'object') {
    if (
      obj instanceof Date ||
      obj instanceof Buffer ||
      (obj.constructor && obj.constructor.name === 'ObjectId')
    ) {
      return obj;
    }

    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        acc[snakeKey] = toSnakeCase(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }

  return obj;
}

export function isBlobArray(value: unknown) {
  return Array.isArray(value) && value.every((item) => item instanceof Blob);
}

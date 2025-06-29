/**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
export function trackByFn(index: number, item: { id: string }) {
  return item.id || index;
}

/**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
export function trackByFn(index: number, item: any): any {
  return item.id || index;
}

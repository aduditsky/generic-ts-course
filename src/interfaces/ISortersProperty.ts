export default interface ISortersProperty<T> {
  property: Extract<keyof T, string | Date | number>;
  isDescending: boolean;
}

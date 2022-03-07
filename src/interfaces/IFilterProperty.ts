export default interface IFilterProperty<T> {
  property: keyof T;
  isTruthySelected: boolean;
}

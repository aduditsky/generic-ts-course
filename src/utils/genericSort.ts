import ISortersProperty from '../interfaces/ISortersProperty';

export default function genericSort<T>(
  a: T,
  b: T,
  propertyType: ISortersProperty<T>
) {
  const { property, isDescending } = propertyType;
  const result = () => {
    if (a[property] > b[property]) {
      return 1;
    }

    if (a[property] < b[property]) {
      return -1;
    }

    return 0;
  };

  return isDescending ? result() * -1 : result();
}

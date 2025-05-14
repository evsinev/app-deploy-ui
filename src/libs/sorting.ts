interface CompareParams<T> {
  field: string;
  isDesc?: boolean;
  a: T;
  b: T;
}

export function compare<T>({ field, isDesc, a, b }: CompareParams<T>) {
  if (a[field as keyof T] < b[field as keyof T]) {
    return isDesc ? -1 : 1;
  }
  if (a[field as keyof T] > b[field as keyof T]) {
    return isDesc ? 1 : -1;
  }
  return 0;
}

// Receives an any type for generalization
export function validateNotEmptyOrNull(...args: any): boolean {
  if (!args.every((val: any) => val)) {
    console.log('Falsey value found');
    return false;
  }

  return true;
}

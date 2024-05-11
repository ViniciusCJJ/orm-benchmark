export function generateCPF(): string {
  const n = () => Math.floor(Math.random() * 10);

  const n1 = n();
  const n2 = n();
  const n3 = n();
  const n4 = n();
  const n5 = n();
  const n6 = n();
  const n7 = n();
  const n8 = n();
  const n9 = n();

  const d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  const d1Rest = d1 % 11;
  const digito1 = d1Rest < 2 ? 0 : 11 - d1Rest;

  const d2 =
    digito1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  const d2Rest = d2 % 11;
  const digito2 = d2Rest < 2 ? 0 : 11 - d2Rest;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${digito1}${digito2}`;
}

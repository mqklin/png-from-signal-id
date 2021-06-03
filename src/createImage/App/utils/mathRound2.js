export default function mathRound2(number) {
  try {
    return Math.round(number * 100) / 100;
  }
  catch {
    return number;
  }
}

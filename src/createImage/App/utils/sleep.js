export default function sleep(t) {
  return new Promise(res => setTimeout(res, t));
}

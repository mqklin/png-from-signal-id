import {gray20, primary, secondary} from 'App/DesignSystem';

export default function getPerformanceColor(performance) {
  return performance > 0 ? primary : performance < 0 ? secondary : gray20;
}

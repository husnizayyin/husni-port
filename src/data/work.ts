export type ChartKind = 'down' | 'up' | 'compound' | 'spike' | 'retain';

export interface WorkItem {
  name: string;
  color: string;
  /** Pill text colour when white would not have enough contrast on `color`. */
  pillText?: string;
  tag: string;
  title: string;
  stats: [value: string, label: string][];
  chart: ChartKind;
}

/** Placeholder case studies. Replace with real client work. */
export const WORK: WorkItem[] = [
  {
    name: 'Ombak Air', color: '#FF5C1A', tag: 'Paid + lifecycle',
    title: 'Cut blended cost per booking by a third in one quarter',
    stats: [['-34%', 'cost per booking'], ['2.1×', 'return on spend'], ['11 wk', 'to payback']], chart: 'down',
  },
  {
    name: 'Nusa Bank', color: '#7B6CF6', tag: 'Brand to performance',
    title: 'Turned a brand campaign into an account-opening engine',
    stats: [['+58%', 'applications'], ['4.4×', 'return on spend'], ['-19%', 'cost per app']], chart: 'up',
  },
  {
    name: 'Teratak', color: '#3FA98A', pillText: '#0E3B2E', tag: 'Organic',
    title: 'Built the search position that now pays the paid bill',
    stats: [['3.8×', 'organic sessions'], ['61%', 'non-paid revenue'], ['14 mo', 'to lead']], chart: 'compound',
  },
  {
    name: 'Hyperlane', color: '#E8C547', pillText: '#0E3B2E', tag: 'Launch',
    title: 'A launch that sold out the first run in nine days',
    stats: [['9 days', 'to sell out'], ['22k', 'waitlist'], ['6.2×', 'launch return']], chart: 'spike',
  },
  {
    name: 'Selasar', color: '#FF5C1A', tag: 'Retention',
    title: 'Stopped the leak before spending another ringgit on reach',
    stats: [['-41%', 'churn'], ['+27%', 'repeat rate'], ['RM0', 'extra spend']], chart: 'retain',
  },
];

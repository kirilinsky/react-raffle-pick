export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-card': 'var(--bg-card)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        burgundy: 'var(--burgundy)',
        'burgundy-deep': 'var(--burgundy-deep)',
        'burgundy-light': 'var(--burgundy-light)',
        gold: 'var(--gold)',
        'gold-deep': 'var(--gold-deep)',
        'gold-light': 'var(--gold-light)',
        green: 'var(--green)',
        'green-light': 'var(--green-light)',
        react: 'var(--react)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        inset: 'var(--shadow-inset)',
      },
      borderRadius: {
        1: 'var(--r-1)',
        2: 'var(--r-2)',
        3: 'var(--r-3)',
        4: 'var(--r-4)',
        5: 'var(--r-5)',
      },
    },
  },
}

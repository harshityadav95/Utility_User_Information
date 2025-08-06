import { render } from '@testing-library/svelte';
import App from './App.svelte';
import { beforeEach, test, expect } from 'vitest';

let container: HTMLElement;

beforeEach(() => {
  const result = render(App);
  container = result.container;
});

test('renders table headings', () => {
  const headings = Array.from(container.querySelectorAll('th')).map(th => th.textContent);
  expect(headings).toContain('Name');
  expect(headings).toContain('Value');
  expect(headings).toContain('Last Updated');
  expect(headings).toContain('Refresh Interval');
});

test('renders at least one info row after mount', () => {
  const rows = container.querySelectorAll('tbody tr');
  expect(rows.length).toBeGreaterThan(0);
});

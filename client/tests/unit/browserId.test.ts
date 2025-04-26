import { test, expect, vi } from 'vitest';

import { getBrowserId } from '../../src/utils/browserId';

beforeAll(() => {
  vi.stubGlobal('crypto', {
    randomUUID: () => 'mocked-random-id',
  });
});

test('returns existing browserId from localStorage', () => {
  localStorage.setItem('browserId', 'existing-id-123');
  const id = getBrowserId();
  expect(id).toBe('existing-id-123');
});

test('creates a new browserId if none exists', () => {
  const id = getBrowserId();
  expect(id).toBe('mocked-random-id');
  expect(localStorage.getItem('browserId')).toBe('mocked-random-id');
});

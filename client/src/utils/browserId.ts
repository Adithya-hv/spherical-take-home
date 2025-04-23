export function getBrowserId(): string {
  const stored = localStorage.getItem('browserId');
  if (stored) return stored;

  const id = crypto.randomUUID(); // Generate a new personal browser Id
  localStorage.setItem('browserId', id);
  return id;
}

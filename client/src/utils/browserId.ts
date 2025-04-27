// This file contains a utility function to generate a unique browser ID
// and store it in local storage. Basically, this is a shortcut for not being able to
// build a user login system due to the time-limit.

// TODO: Make user login system
export function getBrowserId(): string {
  const stored = localStorage.getItem('browserId');
  if (stored) return stored;

  const id = crypto.randomUUID(); // generate a new personal browser Id
  localStorage.setItem('browserId', id);
  return id;
}

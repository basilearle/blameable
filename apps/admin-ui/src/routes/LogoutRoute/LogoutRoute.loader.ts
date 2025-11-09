import { authClient } from '../../auth';

export async function logoutLoader() {
  try {
    await authClient.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }

  return {};
}

// Construit un lien interne qui respecte la base du site (/anxiety-tips/).
// url('') -> /anxiety-tips/ ; url('trousse/') -> /anxiety-tips/trousse/
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
}

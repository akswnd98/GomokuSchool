export function addAppleIcon (href: string, sizes: string, type: string) {
  const iconLink = document.createElement('link');
  iconLink.setAttribute('rel', 'apple-touch-icon');
  iconLink.setAttribute('href', href);
  iconLink.setAttribute('sizes', sizes);
  iconLink.setAttribute('type', type);
  document.getElementsByTagName('head')[0].appendChild(iconLink)
};

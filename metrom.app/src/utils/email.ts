export const openEmail = () => {
  window.location.href = `mailto:${getEmail()}?subject=MetroM`;
};

export const getEmail = () => {
  const domain = "cjx3711.com";
  const email = "hello";
  return `${email}@${domain}`;
};

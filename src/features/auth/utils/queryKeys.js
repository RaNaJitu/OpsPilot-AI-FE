export const profileKeys = {
  all: ["profile"],
  detail: () => [...profileKeys.all, "me"],
};

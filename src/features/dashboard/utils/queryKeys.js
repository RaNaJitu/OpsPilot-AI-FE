export const dashboardKeys = {
  all: ["dashboard"],
  detail: () => [...dashboardKeys.all, "summary"],
};

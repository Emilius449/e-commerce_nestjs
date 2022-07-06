export const getPreNextMonth = (monthNo: number) => {
  const date = new Date();
  return new Date(date.setMonth(date.getMonth() + Number(monthNo)));
};

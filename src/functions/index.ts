export const saveReport = (type: string, body: any) => {
  localStorage.setItem("report-eagle", JSON.stringify({ type, body }));
};

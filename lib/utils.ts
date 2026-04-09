export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatter= new Intl.DateTimeFormat("id-ID", {
dateStyle: "medium",

  });
  return formatter.format(date);
  }



import moment from "moment";

export const formatDates = (record) => {
  if (!record) return record;
  return {
    ...record,
    createdAt: record.createdAt
      ? moment(record.createdAt).format("DD MMM YYYY")
      : null,
    updatedAt: record.updatedAt
      ? moment(record.updatedAt).format("DD MMM YYYY")
      : null,
  };
};

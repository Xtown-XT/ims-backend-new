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
        // Manufacturer Date
    manufactured_date: record.manufactured_date
      ? moment(record.manufactured_date).format("DD MMM YYYY")
      : null,

    // Expiry Date
    expiry_on: record.expiry_on
      ? moment(record.expiry_on).format("DD MMM YYYY")
      : null,
  };
};

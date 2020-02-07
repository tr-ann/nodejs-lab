export default (queryString) => {
  let pagination = {};

  let page = +queryString.page || 1;

  pagination.limit = +queryString.amount || 5;
  pagination.offset = (page - 1) * pagination.limit;

  return pagination;
}
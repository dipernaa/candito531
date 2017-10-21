const required = (value) => (
  (!value || (typeof value === 'string' && value.trim().length === 0)) ? 'Required' : undefined
);

export default required;

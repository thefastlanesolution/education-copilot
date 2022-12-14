const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeHolder,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        autoComplete="smartystreets"
        onChange={handleChange}
        className="form-input"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default FormRow;

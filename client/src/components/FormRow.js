const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeHolder,
  min,
  max,
  disabled,
  style,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        disabled={disabled}
        value={value}
        name={name}
        autoComplete="smartystreets"
        onChange={handleChange}
        className="form-input"
        placeholder={placeHolder}
        style={style}
      />
    </div>
  );
};

export default FormRow;

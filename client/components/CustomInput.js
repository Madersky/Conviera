const CustomInput = ({
  name,
  id,
  type,
  className,
  value,
  setter,
  placeholder,
  error,
  iClass,
}) => {
  return (
    <div className="custom-input">
      <label htmlFor={id}>{name}</label>

      <div className={className ? className : "custom-input__instance"}>
        {iClass ? <i className={`${iClass}`}></i> : null}
        <input
          className={`custom-input__instance-input`}
          id={id}
          type={type}
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
        ></input>
      </div>
      <p className="custom-input__error">{error}</p>
    </div>
  );
};
export default CustomInput;

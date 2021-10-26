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
    <div>
      <label className="" htmlFor={id}>
        {name}
      </label>

      <div className={className}>
        {iClass ? (
          <span className="">
            <i className={`bi ${iClass}`}></i>
          </span>
        ) : null}

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
        ></input>
      </div>
      <p className="">{error}</p>
    </div>
  );
};
export default CustomInput;

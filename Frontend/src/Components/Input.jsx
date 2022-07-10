function Input({ text, name, labelStyle, inputStyle, ...rest }) {
  return (
    <div className="relative">
      <label className={labelStyle} htmlFor={name}>
        {text}
      </label>
      <input className={inputStyle} {...rest} />
    </div>
  );
}

export default Input;

function Input({ text, name, labelStyle, inputStyle, ...rest }) {
  return (
    <>
      <label className={labelStyle} htmlFor={name}>
        {text}
      </label>
      <input className={inputStyle} {...rest} />
    </>
  );
}

export default Input;

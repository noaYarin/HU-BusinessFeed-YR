function Button({ text = "", buttonStyle = "" }) {
  return <button className={buttonStyle}>{text}</button>;
}

export default Button;

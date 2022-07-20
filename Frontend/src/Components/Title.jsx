function Title({ text = "Title", titleStyle = "" }) {
  return <h1 className={titleStyle}>{text}</h1>;
}

export default Title;

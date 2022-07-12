function Image({ src, alt, imageStyle }) {
  return <img src={src} alt={alt} className={imageStyle} />;
}

export default Image;

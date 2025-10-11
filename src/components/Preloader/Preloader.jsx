import "./Preloader.css";

function Preloader({ text = "Loading..." }) {
  return (
    <div className="preloader-container">
      <div className="circle-preloader" />
      <p className="preloader-text">{text}</p>
    </div>
  );
}

export default Preloader;

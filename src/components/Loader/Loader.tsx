
import './Loader.css'; 

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner">
        <h3>Content is loading...</h3>
        <div className="lds-spinner">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;

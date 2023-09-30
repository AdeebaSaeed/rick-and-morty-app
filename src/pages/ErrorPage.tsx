import './ErrorPage.css';
import errorImage from '../../assets/images/errorImage.jpg';


function ErrorPage() {
  return (
    <div className="error-page-container">
      <div className="no-character-found">
        <p>No Character Found</p>
        <img src={errorImage} alt="Error" />
      </div>
    </div>
  );
}

export default ErrorPage;

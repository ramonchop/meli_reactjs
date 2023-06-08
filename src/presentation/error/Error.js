import { useRouteError } from "react-router-dom";
import './Error.sass'


export default function ErrorComponent() {
  const error = useRouteError();

  return (
    <div className="error-container">
        
      <h1>Oops!</h1>
      <p>Ha ocurrido un error inesperado</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
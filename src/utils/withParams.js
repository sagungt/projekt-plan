import { useParams } from "react-router";

const witnParams = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

export default witnParams;

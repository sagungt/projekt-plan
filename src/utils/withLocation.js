import { useLocation } from "react-router";

const withLocation = (WrappedComponent) => (props) => {
  const location = useLocation();
  return <WrappedComponent {...props} location={location} />;
};

export default withLocation;

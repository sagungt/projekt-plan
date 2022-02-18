import { useNavigate } from "react-router";

const withNavigate = (WrappedComponent) => (props) => {
  const history = useNavigate();
  return <WrappedComponent {...props} history={history} />;
};

export default withNavigate;

// CSS
import "./Error.scss";

const Error = ({ children = "", error = "" }) => {
	return <div className="eZMpu">{children ? children : error}</div>;
};

export default Error;

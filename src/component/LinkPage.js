import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/protect/login">Login</Link>
      <Link to="/protect/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/protect/">Home</Link>
      <Link to="/protect/editor">Editors Page</Link>
      <Link to="/protect/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;

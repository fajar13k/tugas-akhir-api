import { useEffect, useState } from "react";
import { enquireScreen } from "enquire-js";
import Header from "./layout/Header";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import "../styles/base.scss";
import { useAuth } from "../context/auth";

const App = () => {
  const { hasRestrictAccess, token } = useAuth();

  const [isMobile, setIsMobile] = useState();
  const [authSection, setAuthSection] = useState("signin");

  const handleAuthDirection = (section) => {
    setAuthSection(section);
  };

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b);
    });
  }, []);

  return (
    <div className="App">
      {token ? (
        <>
          <Header isMobile={isMobile} />
          <Dashboard />
        </>
      ) : (
        <Auth
          origin={authSection}
          onChangeSection={handleAuthDirection}
          setRestrict={hasRestrictAccess}
        />
      )}
    </div>
  );
};

export default App;
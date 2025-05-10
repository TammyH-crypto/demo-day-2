import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
import "./index.css";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_qqexb7XQH",
  client_id: "41tpi118bmfmbh78siipt3p9an",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

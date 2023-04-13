import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  LogInForm,
  ForgotPasswordForm,
  ResetPasswordForm,
} from "./authentication";
import {
  Home,
  AgentsList,
  AddAgent,
  EditAgent,
  ListingList,
  AddListing,
  EditListing,
  Marketing,
  AgencyList,
  AddAgency,
  EditAgency,
  UserList,
} from "./Pages";
import { Erro404 } from "./components";

function App() {
  const navigate = useNavigate();

  const getPath = useLocation().pathname.split("/")?.[2];
  const getUrl = useLocation().pathname.split("/")?.[1];

  const checkAuth = localStorage.getItem("AdminToken");
  useEffect(() => {
    if (checkAuth === undefined || checkAuth === null) {
      if (getPath === "reset-password") {
      } else if (getPath === "forgot-password") {
      } else if (getUrl === "sign-up") {
      } else {
        navigate("/log-in");
      }
    }
  }, [checkAuth, navigate]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/agency" element={<AgencyList />} />
        <Route exact path="/agency/add" element={<AddAgency />} />
        <Route exact path="/agency/edit/:id" element={<EditAgency />} />

        <Route exact path="/listings" element={<ListingList />} />
        <Route exact path="/listings/add/:type" element={<AddListing />} />
        <Route exact path="/listings/edit/:id" element={<EditListing />} />

        <Route exact path="/agents" element={<AgentsList />} />
        <Route exact path="/agents/add" element={<AddAgent />} />
        <Route exact path="/agents/edit/:id" element={<EditAgent />} />

        <Route exact path="/user" element={<UserList />} />


        

        {/* -------- Authentication -------- */}

        <Route exact path="/log-in" element={<LogInForm />} />
        <Route
          exact
          path="/auth/forgot-password"
          element={<ForgotPasswordForm />}
        />
        <Route
          exact
          path="/auth/reset-password/:token/:id"
          element={<ResetPasswordForm />}
        />

        {/* -------- 404 Not Found -------- */}

        <Route exact path="*" element={<Erro404 />} />
      </Routes>
    </>
  );
}

export default App;

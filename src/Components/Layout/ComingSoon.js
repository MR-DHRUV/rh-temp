import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../Assets/Styles/coming-soon.css";

function ComingSoon() {
  const navigate = useNavigate();

  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        var head = $(".hs-form-iframe").contents().find("head");
        var css =
          '<style type="text/css">' +
          ".hubspot-link__container{display:none}; " +
          "</style>";
        $(head).append(css);
      }, 2000);
    });

    window.hbspt.forms.create({
      region: "na1",
      portalId: "20575369",
      formId: "a3af64d3-f630-47e8-ad73-24524ec0c1b9",
      target: "#hubspotFormContainer",
    });
  }, []);

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col">
          <div className="logo">
            <img
              src={require("../Assets/Media/Images/logo.png")}
              className="img-fluid logo-sm"
              alt="Rise Higher Education"
              title="Rise Higher Education"
            />
          </div>
          <div className="body-text float-start">
            <h1 className="page-heading">Scholarship</h1>
            <br />
            <p>
              Stay tuned to unwrap your higher education dreams come true
              <br /> starting with <strong>ScholaRISE</strong>.
            </p>
            <p>
              {/* <iframe frameborder="0" src="https://share.hsforms.com/1o69k0_YwR-itcyRSTsDBuQc9021"></iframe> */}
              <div id="hubspotFormContainer"></div>
            </p>
          </div>
          <div className="banner float-end">
            <img
              src={require("../Assets/Media/Images/comingsoon-banner.png")}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;

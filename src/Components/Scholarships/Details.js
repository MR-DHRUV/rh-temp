import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { url } from "../Constants";


const Details = () => {
  const { id } = useParams("");
  const [indata, setIndata] = useState("");
  const [cat, setCat] = useState("");
  const authToken = localStorage.getItem("token");

  const onChange = (e) => { setCat(e.target.value) };

  const getData = async (id) => {
    const res = await fetch(
      `${url}/scholarship/id/${id}`, {
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      headers: {
        "token": authToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    const json = await res.json();

    if (res.status === 200) {
      setIndata(json.data);
      setCat(json.category);
    } else {
      alert("no data available");
    }

  };

  useEffect(() => {
    getData(id);
  }, [id]);


  const categorize = async (cat) => {
    const checkResponse = await fetch(
      `${url}/scholarship/update`,
      {
        method: "POST",
        headers: {
          "token": authToken,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: indata._id,
          category: cat
        }),
        mode: 'cors',
        referrerPolicy: "origin-when-cross-origin",
      }
    );

    const json = await checkResponse.json();
  }

  useEffect(() => {
    categorize(cat);
  }, [cat]);


  return (
    <div className="body-content">
      <div className="scholarship-details-banner">
        <img
          src={require("../Assets/Media/Images/scholarship-detail-banner.jpg")}
          alt="img"
        />
      </div>
      <div className="scholarship-details-container d-flex justify-content-center">
        <div className="scholarship-details-content">
          <div className="d-flex">
            <div className="scholarship-logo me-2">
              <img src={indata.Image_Address} alt="img" />
            </div>
            <div className="scholarship-name">{indata.Scholarship_Name}</div>
          </div>
          <div className="scholarship-details-list">
            <ul className="d-flex justify-content-between">
              <li>
                <span className="scholarship-details-list-heading">
                  Organization
                </span>
                <br />
                <span>{indata.Awarding_Body}</span>
              </li>
              <li>
                <span className="scholarship-details-list-heading">
                  Destination Country
                </span>
                <br />
                <span>{indata.Destination_Country}</span>
              </li>
              <li>
                <span className="scholarship-details-list-heading">Level</span>
                <br />
                <span>{indata.Program_Level}</span>
              </li>
              <li>
                <span className="scholarship-details-list-heading">
                  Deadline
                </span>
                <br />
                <span>{indata.Application_End_Date}</span>
              </li>
            </ul>
          </div>
          <div className="form-button mb-5 d-flex justify-content-between">
            <div>
              <a
                href={indata.Application_Link}
                target="_blank"
                className="btn btn-primary-regular"
                rel="noreferrer"
              >
                Apply Scholarship <i className="ms-1 fa-solid fa-xs fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            {/* for categorise */}
            <div className="form-group mb-0">
              <label for="inputState" className="form-label">Update Status</label>
              <select id="inputState" className="form-select" value={cat} onChange={onChange} >
                <option selected value="" >Choose...</option>
                <option value="Applied" >Applied</option>
                <option value="Approved" >Approved</option>
                <option value="SavedForLater" >Saved for Later</option>
                <option value="PendingDecision" >Pending Decision</option>
                <option value="Rejected" >Rejected</option>
              </select>
            </div>
          </div>

          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Scholarship Overview
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                  <p>{indata.Description}</p>
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" colSpan={2}>
                          Overview
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Scholarship Name</td>
                        <td>{indata.Scholarship_Name}</td>
                      </tr>
                      <tr>
                        <td>Application Start Date</td>
                        <td>{indata.Application_Start_Date}</td>
                      </tr>
                      <tr>
                        <td>Application End Date</td>
                        <td>{indata.Application_End_Date}</td>
                      </tr>
                      <tr>
                        <td>Awarded for</td>
                        <td>{indata.Applicable_for}</td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>{indata.Amount}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{indata.State}</td>
                      </tr>
                      <tr>
                        <td>University</td>
                        <td>{indata.University}</td>
                      </tr>
                      <tr>
                        <td>Type of Scholarship</td>
                        <td>{indata.Type_of_Scholarship}</td>
                      </tr>
                      <tr>
                        <td>Awarding Body</td>
                        <td>{indata.Awarding_Body}</td>
                      </tr>
                      <tr>
                        <td>Weblink</td>
                        <td>
                          <a href={indata.Weblink} target="_blank" className="" rel="noreferrer" >Details</a><i className="ms-1 fa-solid fa-xs fa-arrow-up-right-from-square"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Eligibility
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                {/* <div className="accordion-body">
                  <ul>
                    <li>
                      Must be enrolled full-time in a Bachelor's, Master's, or
                      PhD program in a qualified university in the United States
                    </li>
                    <li>
                      Must be pursuing a degree in computer science, computer
                      engineering, or a related technical field
                    </li>
                    <li>Must maintain a cumulative GPA of 3.0 or higher</li>
                    <li>
                      Must have completed at least one year of college before
                      applying for the scholarship
                    </li>
                  </ul>
                </div> */}
                <div className="accordion-body">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" colSpan={2}>
                          Overview
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Academic Eligibility</td>
                        <td>{indata.Academic_Eligibility}</td>
                      </tr>
                      <tr>
                        <td>Race/Ethnicity</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Sex</td>
                        <td>{indata.Sex}</td>
                      </tr>
                      <tr>
                        <td>Special Category</td>
                        <td>{indata.Category}</td>
                      </tr>
                      <tr>
                        <td>Study Area</td>
                        <td>{indata.Study_Area}</td>
                      </tr>
                      <tr>
                        <td>Program Level</td>
                        <td>{indata.Program_Level}</td>
                      </tr>
                      <tr>
                        <td>Citizenship</td>
                        <td>{indata.Eligible_Citizenship}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Application Process
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div className="accordion-body">
                  {<table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" colSpan={2}>
                          Overview
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Contact Name</td>
                        <td>{indata.Contact_Name}</td>
                      </tr>
                      <tr>
                        <td>Contact ID</td>
                        <td><a href={'mailto:' + indata.Contact_ID}>{indata.Contact_ID}</a></td>
                      </tr>
                      <tr>
                        <td>Contact Number</td>
                        <td><a href={'tel:' + indata.Contact_Number}>{indata.Contact_Number}</a></td>
                      </tr>
                    </tbody>
                  </table>}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between footer-link-container">
            <Link to="/scholarship">
              <i className="fa fa-chevron-left" /> Back to listing
            </Link>
            <div className="form-button">
              <a
                href={indata.Application_Link}
                target="_blank"
                className="btn btn-primary-regular"
                rel="noreferrer"
              >
                Apply Scholarship <i className="ms-1 fa-solid fa-xs fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

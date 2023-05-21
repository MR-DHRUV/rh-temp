import React, { useState, useEffect } from "react";
import "../Assets/Styles/sidebar-menu.css";
import ListItem from "./ListItem";
import countryStates from "../Assets/Data/state.json";
import countryUni from "../Assets/Data/university.json";
import Filter from "./Filter";
import { url } from "../Constants";
import { useNavigate } from "react-router-dom";
import querystring from "querystring"

const Home = () => {
  const [view, setView] = useState("list");
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const [universityData, setUniversityData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [initial, setInitial] = useState(true);
  const [cat, setCat] = useState('All');

  const [filter, setFilter] = useState({ eligibleCitizenship: "", state: "", destinationCountry: "", university: "", level: "", program: "", sex: "", raceEthnicity: "", specialCategory: "" })

  const [filterData, setFilterData] = useState({ eligibleCitizenship: "", state: "", destinationCountry: "", university: "", level: "", program: "", sex: "", raceEthnicity: "", specialCategory: "" })

  const toggleGrid = () => {
    document.getElementById("list-header").style.display = "none";
    setView("grid");
  };

  const toggleList = () => {
    document.getElementById("list-header").style.display = "flex";
    setView("list");
  };

  const onChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value })
  }

  const handlenationality = (e) => {

    if (e.target.value !== "") {
      const getStatedata = countryStates.find(
        (country) => country.country_name === e.target.value
      ).states;
      setStateData(getStatedata);
    }
    else {
      setStateData([]);
    }

    setFilter({ ...filter, eligibleCitizenship: e.target.value })
  };

  const handledestination = (e) => {

    if (e.target.value === "India" || e.target.value === "United States") {
      const getUniversitydata = countryUni.find(
        (country) => country.country_name === e.target.value
      ).university;
      console.log(e.target.value)
      setUniversityData(getUniversitydata);
    }
    else {
      setUniversityData([]);
    }

    setFilter({ ...filter, destinationCountry: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFilterData(filter);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setFilter({ eligibleCitizenship: "", state: "", destinationCountry: "", university: "", level: "", program: "", sex: "", raceEthnicity: "", specialCategory: "" });

    setFilterData({ eligibleCitizenship: "", state: "", destinationCountry: "", university: "", level: "", program: "", sex: "", raceEthnicity: "", specialCategory: "" });
    setUniversityData([])
    setStateData(([]))

    await getData();
  };

  //for pagination
  const [data, setdata] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const PAGE_SIZE_OPTIONS = [5, 10, 20];

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageSizeChange = async (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const getData = async () => {

    const req = `${url}/scholarship?page=${currentPage}&size=${pageSize}&Destination_Country=${filterData.destinationCountry}&State=${filterData.state}&Eligible_Citizenship=${filterData.eligibleCitizenship}&University=${filterData.university}&Category=${filterData.specialCategory}&Race_Ethnicity=${filterData.raceEthnicity}&Sex=${filterData.sex}&Study_Area=${filterData.program}&Program_Level=${filterData.level}`;

    const response = await fetch(req, {
      method: 'GET'
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': authToken
      },
    });

    const responseData = await response.json();

    if (response.status === 200) {
      setdata(responseData.usersdata);
      setPageCount(responseData.Pagination.pageCount);
    } else {

      // delete corrupted token
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchQuery = async () => {

    const query = localStorage.getItem('UserFilter')
    if (!query) {
      localStorage.removeItem('token');
      navigate('/login');
    }

    const queryObject = querystring.parse(query);
    // console.log(queryObject)
    // console.log(queryObject["Destination_Country"])

    setFilterData({
      eligibleCitizenship: queryObject["Eligible_Citizenship"] || "",
      destinationCountry: queryObject["Destination_Country"] || "",
      state: queryObject["State"] || "",
      university: queryObject["University"] || "",
      level: queryObject["Program_Level"] || "",
      program: queryObject["Study_Area"] || "",
      sex: queryObject["Sex"] || "",
      raceEthnicity: queryObject["Race_Ethnicity"] || "",
      specialCategory: queryObject["Category"] || "",
    });

    setFilter({
      eligibleCitizenship: queryObject["Eligible_Citizenship"] || "",
      destinationCountry: queryObject["Destination_Country"] || "",
      state: queryObject["State"] || "",
      university: queryObject["University"] || "",
      level: queryObject["Program_Level"] || "",
      program: queryObject["Study_Area"] || "",
      sex: queryObject["Sex"] || "",
      raceEthnicity: queryObject["Race_Ethnicity"] || "",
      specialCategory: queryObject["Category"] || "",
    });

  }

  const loadInitialConfig = async () => {
    setInitial(false);
    await fetchQuery();
  }

  const changeCat = async (category) => {
    setCat(category);
    setCurrentPage(1);
  }

  // for getting scholarship details for diffrent categories
  const getCategoryData = async (cat) => {

    const req = `${url}/scholarship/category?page=${currentPage}&size=${pageSize}`;
    const response = await fetch(req, {
      method: 'POST',
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': authToken
      },
      body: JSON.stringify({
        category: cat
      }),
    });

    const json = await response.json();
    setdata(json.scholarships);
    setPageCount(json.Pagination.pageCount);
  }

  useEffect(() => {
    if (initial) {
      loadInitialConfig();
    }
    else {
      if (cat === 'All') {
        getData();
      }
      else {
        getCategoryData(cat);
      }
    }
  }, [currentPage, pageSize, cat, filterData]);


  return (
    <div>
      <div className="body-content">
        <div className="body-panel d-flex justify-content-between">
          <div className="filter-container">
            <div className="row">
              <div className="col">
                <div className="sidepanel-heading">Filter</div>
                <Filter filter={filter} onChange={onChange} handleSubmit={handleSubmit} handleReset={handleReset} handlenationality={handlenationality} handledestination={handledestination} countrydata={countryStates} stateData={stateData} universityData={universityData} />
              </div>
            </div>
          </div>
          <div className="body-container">
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-between mt-3">
                  <div className="page-content">
                    <h1 className="mb-3">Scholarship</h1>
                    <p>
                      <strong>
                        Worried about financing your higher studies?
                      </strong>
                    </p>
                    <p>
                      Search from RHE’s unique all Scholarship search engine to
                      explore all funding opportunities specially Scholarships.
                    </p>
                  </div>
                  <div className="video-container ms-5">
                    <video controls="" width={350} muted autoPlay loop>
                      <source
                        src={require("../Assets/Media/videos/mov_bbb.mp4")}
                        type="video/mp4"
                      />
                      <source
                        src={require("../Assets/Media/videos/mov_bbb.ogg")}
                        type="video/ogg"
                      />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            {/* button for adding to categories start here */}
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-all-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-all"
                  type="button"
                  role="tab"
                  aria-controls="pills-all"
                  aria-selected="true"
                  onClick={() => changeCat("All")}
                >
                  All {cat === 'All' && `(${pageCount * pageSize})`}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-applied-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-applied"
                  type="button"
                  role="tab"
                  aria-controls="pills-applied"
                  aria-selected="false"
                  onClick={() => changeCat("Applied")}
                >
                  Applied
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-approved-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-approved"
                  type="button"
                  role="tab"
                  aria-controls="pills-approved"
                  aria-selected="false"
                  onClick={() => changeCat("Approved")}
                >
                  Approved
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-savedforlater-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-savedforlater"
                  type="button"
                  role="tab"
                  aria-controls="pills-savedforlater"
                  aria-selected="false"
                  onClick={() => changeCat("SavedForLater")}
                >
                  Saved for Later
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-pendingdecision-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-pendingdecision"
                  type="button"
                  role="tab"
                  aria-controls="pills-pendingdecision"
                  aria-selected="false"
                  onClick={() => changeCat("PendingDecision")}
                >
                  Pending Decision
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-rejected-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-rejected"
                  type="button"
                  role="tab"
                  aria-controls="pills-rejected"
                  aria-selected="false"
                  onClick={() => changeCat("Rejected")}
                >
                  Rejected
                </button>
              </li>
            </ul>

            {/* button for adding to categories ended here */}
            {/* button for adding to categories ended here */}

            <div className="row">
              <div className="col">
                <div className="grid-container">
                  <div className="buttons">
                    <button className="grid" onClick={toggleGrid}>
                      <i className="fa-solid fa-grip" />
                    </button>
                    <button className="list" onClick={toggleList}>
                      <i className="fa-solid fa-list" />
                    </button>
                  </div>
                  <ul className="list-detail list-header" id="list-header">
                    <li className="list-width-15">Name</li>
                    <li className="list-width-10">Eligibility</li>
                    <li className="list-width-10">Level</li>
                    <li className="list-width-10">Deadline</li>
                    <li className="list-width-10">Amount</li>
                    <li className="list-width-10">Process</li>
                  </ul>
                  <ul
                    className={
                      view === "list" ? "list grid-list" : "grid grid-list"
                    }
                  >
                    {data.length === 0 ? "No items here" : data.map((element) => {
                      return (
                        <ListItem
                          mode={view}
                          id={element._id}
                          imgsrc={
                            element.Image_Address !== undefined ? element.Image_Address : "missing"
                          }
                          // location={element.State ? element.State : "missing"}
                          // ownership={
                          //   element.University ? element.University : "missing"
                          // }
                          destination_country={
                            element.Destination_Country
                              ? element.Destination_Country
                              : "missing"
                          }
                          eligibility_citizenship={
                            element.Eligible_Citizenship
                              ? element.Eligible_Citizenship
                              : "missing"
                          }
                          // scholarship_organization={
                          //   element.Awarding_Body
                          //     ? element.Awarding_Body
                          //     : "missing"
                          // }

                          scholarship_name={
                            element.Scholarship_Name
                              ? element.Scholarship_Name
                              : "Not Applicable"
                          }
                          scholarship_level={
                            element.Program_Level
                              ? element.Program_Level
                              : "Not Applicable"
                          }
                          scholarship_link={
                            element.Application_Link ? element.Application_Link : "#"
                          }
                          scholarship_amount={
                            element.Amount ? element.Amount : "Not Applicable"
                          }
                          scholarship_deadline={
                            element.Application_End_Date
                              ? element.Application_End_Date
                              : "Not Applicable"
                          }
                          key={element._id}
                        />
                      );
                    })}
                  </ul>

                  <div className="grid-size">
                    <label htmlFor="pageSizeSelect">Page Size: </label>
                    <select
                      id="pageSizeSelect"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                    >
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid-contols">
                    <button
                      disabled={currentPage === 1}
                      onClick={handlePreviousPage}
                    >
                      Previous Page
                    </button>
                    <button
                      disabled={currentPage === pageCount}
                      onClick={handleNextPage}
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = (props) => {

  const {
    id,
    imgsrc,
    destination_country,
    scholarship_name,
    scholarship_level,
    scholarship_deadline,
    scholarship_amount,
    scholarship_link,
  } = props;

  return (
    <li className="main-list">
      <ul
        className={
          props.mode === "list" ? "list-detail list" : "list-detail grid"
        }
      >
        <li className="list-width-15">
          {props.mode === "grid" ? (
            <div><span className="uni-logo">
              {imgsrc !== "missing" && <img src={imgsrc} alt="img" />}
            </span></div>
          ) : (
            ""
          )}
          <div>
            <span className="uni-name">{scholarship_name}</span>
            {props.mode === "grid" ? (
              <br />
            ) : (
              ""
            )}
            {props.mode === "grid" ? (
              <span className="uni-location">{destination_country}</span>
            ) : (
              ""
            )}
          </div>
        </li>
        <li className="list-width-10">
          {props.mode === "grid" ? (
            <span className="list-text-label">
              Eligibility
              <br />
            </span>
          ) : (
            ""
          )}
          <NavLink to={`/scholarship/details/${id}`}>View</NavLink>
        </li>
        <li className="list-width-10">
          {props.mode === "grid" ? (
            <span className="list-text-label">
              Level <br />
            </span>
          ) : (
            ""
          )}
          {scholarship_level}
        </li>
        <li className="list-width-10">
          {props.mode === "grid" ? (
            <span className="list-text-label">
              Deadline <br />
            </span>
          ) : (
            ""
          )}
          {scholarship_deadline}
        </li>
        <li className="list-width-10">
          {props.mode === "grid" ? (
            <span className="list-text-label">
              Amount <br />
            </span>
          ) : (
            ""
          )}
          {scholarship_amount}
        </li>
        <li className="list-width-10">
          <a href={scholarship_link} target="_blank">
            Apply Now<i className="ms-1 fa-solid fa-xs fa-arrow-up-right-from-square"></i>
          </a>
        </li>
      </ul>
    </li>
  );
};

export default ListItem;

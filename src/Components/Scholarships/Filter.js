import React from 'react'

const Filter = (props) => {

    return (
        <>
            <a onClick={props.handleReset} className="link-filter">
                Reset All
            </a>

            <form onSubmit={props.handleSubmit}>
                <div className="filter-content">
                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Eligible Citizenship
                        </label>

                        <select
                            name="eligibleCitizenship"
                            value={props.filter.eligibleCitizenship}
                            className="form-select"
                            onChange={(e) => props.handlenationality(e)}
                        >
                            <option value="">Select Country</option>
                            {props.countrydata !== undefined && props.countrydata.map((getcountry, index) => (
                                <option value={getcountry.country_name} key={index}>
                                    {getcountry.country_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            State
                        </label>
                        <select
                            name="state"
                            value={props.filter.state}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select State</option>
                            {props.stateData !== undefined && props.stateData.map((getstate, index) => (
                                <option value={getstate.state_name} key={index}>
                                    {getstate.state_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Destination Country
                        </label>
                        <select
                            name="destinationCountry"
                            value={props.filter.destinationCountry}
                            className="form-select"
                            onChange={(e) => props.handledestination(e)}
                        >
                            <option value="">Select Country</option>
                            {props.countrydata !== undefined && props.countrydata.map((getcountry, index) => (
                                <option value={getcountry.country_name} key={index}>
                                    {getcountry.country_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            University
                        </label>
                        <select
                            name="university"
                            value={props.filter.university}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select University</option>
                            {props.universityData !== undefined && props.universityData.map((getstate, index) => (
                                <option value={getstate.university_name} key={index}>
                                    {getstate.university_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Sex
                        </label>
                        <select
                            name="sex"
                            value={props.filter.sex}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="">All</option>
                        </select>
                    </div>

                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Level
                        </label>
                        <select
                            name="level"
                            value={props.filter.level}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select Level</option>
                            <option value="High School (11th - 12th)">High School (11th - 12th)</option>
                            <option value="UG Diploma/ Certificate/ Associate Degree">UG Diploma/ Certificate/ Associate Degree</option>
                            <option value="UG">UG</option>
                            <option value="PG Diploma/Certificate">PG Diploma/Certificate</option>
                            <option value="PG">PG</option>
                            <option value="UG+PG (Accelerated) Degree">UG+PG (Accelerated) Degree</option>
                            <option value="PhD">PhD</option>
                            <option value="Foundation">Foundation</option>
                            <option value="Short Term Programs">Short Term Programs</option>
                            <option value="Pathway Programs">Pathway Programs</option>
                            <option value="Twinning Programmes (PG)">Twinning Programmes (PG)</option>
                            <option value="English Language Program">English Language Program</option>
                            <option value="Online Programmes / Distance Learning">Online Programmes / Distance Learning</option>
                            <option value="Technical School/College">Technical School/College</option>
                            <option value="Trade School/College">Trade School/College</option>
                            <option value="">All</option>
                            <option value="UG and PG">UG and PG</option>
                            <option value="Degree Programs Only">Degree Programs Only</option>
                        </select>
                    </div>

                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Race/Ethnicity
                        </label>
                        <select
                            name="raceEthnicity"
                            value={props.filter.raceEthnicity}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select Race/Ethnicity</option>
                            <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                            <option value="Asian">Asian</option>
                            <option value="Black or African American">Black or African American</option>
                            <option value="Hispanic or Latino">Hispanic or Latino</option>
                            <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                            <option value="White">White</option>
                            <option value="">N/A</option>
                            <option value="Open for All">Open for All</option>
                        </select>
                    </div>

                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Program
                        </label>
                        <select
                            name="program"
                            value={props.filter.program}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select program</option>
                            <option value="Not Applicable">Not Applicable</option>
                            <option value="Forestry and Fishery">Forestry and Fishery</option>
                            <option value="Architecture and Building">Architecture and Building</option>
                            <option value="Arts">Arts</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Business and Administration">Business and Administration</option>
                            <option value="Computer Science and Information Technology">Computer Science and Information Technology</option>
                            <option value="Education">Education</option>
                            <option value="Engineering and Engineering Trades">Engineering and Engineering Trades</option>
                            <option value="Environmental Science/Protection">Environmental Science/Protection</option>
                            <option value="Health, Humanities">Health, Humanities</option>
                            <option value="Journalism and Information">Journalism and Information</option>
                            <option value="Law">Law</option>
                            <option value="Life Sciences">Life Sciences</option>
                            <option value="Manufacturing and Processing">Manufacturing and Processing</option>
                            <option value="Mathematics and Statistics">Mathematics and Statistics</option>
                            <option value="Personal Services">Personal Services</option>
                            <option value="Physical Sciences">Physical Sciences</option>
                            <option value="Sciences">Sciences</option>
                            <option value="Security Services">Security Services</option>
                            <option value="Social and Behavioural Science">Social and Behavioural Science</option>
                            <option value="Social Services">Social Services</option>
                            <option value="Transport Services">Transport Services</option>
                            <option value="Veterinary">Veterinary</option>
                            <option value="">Any</option>
                        </select>
                    </div>

                    <div className="filter-container-item form-group">
                        <label htmlFor="inputState" className="form-label">
                            Special Category
                        </label>
                        <select
                            name="specialCategory"
                            value={props.filter.specialCategory}
                            className="form-select"
                            onChange={props.onChange}
                        >
                            <option value="">Select Special Category</option>
                            <option value="Veteran">Veteran</option>
                            <option value="Flexible Learning">Flexible Learning</option>
                            <option value="International Students">International Students</option>
                            <option value="Special Category">Special Category</option>
                            <option value="LGBTQ+">LGBTQ+</option>
                            <option value="Women">Women</option>
                            <option value="Minority">Minority</option>
                            <option value="">N/A</option>
                            <option value="Physically Challenged">Physically Challenged</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    <div className="form-button">
                        <button name="submit" className="btn btn-primary">
                            Filter
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Filter

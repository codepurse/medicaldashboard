import { HiPhotograph } from "react-icons/hi";

export const option_page = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
];

export const event_type = [
  { value: "Session", label: "Session" },
  { value: "Company Meeting", label: "Company Meeting" },
];

export const activity_type = [
  { value: "Phone", label: "Phone" },
  { value: "Travel", label: "Travel" },
  { value: "Session", label: "Session" },
  { value: "Virtual Session", label: "Virtual Session" },
];

export const options_phone = [
  { value: "Office", label: "Office" },
  { value: "Mobile", label: "Mobile" },
  { value: "Home", label: "Home" },
  { value: "Other", label: "Other" },
];

export const options_marital = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Widowed", label: "Widowed" },
  { value: "Divorced", label: "Divorced" },
  { value: "Domestic Partnership", label: "Domestic Partnership" },
  { value: "Long-Term Relationship", label: "Long-Term Relationship" },
];

export const options_relationship = [
  { value: "All Member", label: "All Member" },
  { value: "Identified Patient", label: "Identified Patient" },
  { value: "Mother", label: "Mother" },
  { value: "Father", label: "Father" },
  { value: "Husband", label: "Husband" },
  { value: "Wife", label: "Wife" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
  { value: "Son", label: "Son" },
  { value: "Daughter", label: "Daughter" },
  { value: "Other", label: "Other" },
];

export const options_risk = [
  { value: "1", label: "Low" },
  { value: "2", label: "Moderate" },
  { value: "3", label: "High Risk" },
  { value: "4", label: "None" },
];

export const options_status = [
  { value: 1, label: "Active" },
  { value: 0, label: "Discharged" },
];

export const options_race = [
  {
    value: "American Indian or Alaska Native",
    label: "American Indian or Alaska Native",
  },
  {
    value: "Asian",
    label: "Asian",
  },
  { value: "Black or African American", label: "Black or African American" },
  { value: "Hispanic or Latinx", label: "Hispanic or Latinx" },
  {
    value: "Middle Eastern or North American",
    label: "Middle Eastern or North American",
  },
  {
    value: "Native Hawaiian or Other Pacific Islander",
    label: "Native Hawaiian or Other Pacific Islander",
  },
  { value: "White", label: "White" },
  { value: "Other", label: "Other" },
];

export const options_gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-Binary", label: "Non-Binary" },
  { value: "Transgender", label: "Transgender" },
  { value: "Intersex", label: "Intersex" },
  { value: "Other", label: "Other" },
];

export const options_notes = [
  { value: "Crisis Note", label: "Crisis Notes" },
  { value: "Collaboration Note", label: "Collaboration Note" },
  { value: "Family Session", label: "Family Session" },
  { value: "Group Session", label: "Group Session" },
  { value: "Individual Session", label: "Individual Session" },
  { value: "Shift Report", label: "Shift Report" },
];

export const filetype = (value) => {
  switch (value) {
    case "docx":
      return "/Image/icon/file.png";
    case "pdf":
      return "/Image/icon/pdf.png";
    case "txt":
      return "/Image/icon/txt.png";
    case "jpg":
      return "/Image/icon/jpg.png";
    case "png":
      return "/Image/icon/png.png";
    default:
      return "/Image/icon/file.png";
  }
};

export const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#F7F8FA",
    color: "#212121",
    border: "2px solid #EEEEEE",
    boxShadow: "none",
    borderRadius: "5px",
    fontWeight: "500",
    fontSize: "15px",
    width: "100%",
    padding: "1px",
    marginTop: "5px",
    fontFamily: "Poppins",
    marginBottom: "0px",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
  }),
};

export const customStylesnotes = {
  control: (base, state) => ({
    ...base,
    color: "#212121",
    border: "0px",
    boxShadow: "none",
    fontWeight: "500",
    fontSize: "15px",
    width: "220px",
    padding: "1px",
    marginTop: "5px",
    fontFamily: "Poppins",
    marginBottom: "0px",
    zIndex: "10000",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
  }),
};

export const customStylesErrornotes = {
  control: (base, state) => ({
    ...base,
    color: "#212121",
    border: "0px",
    borderBottom: "2px solid red",
    boxShadow: "none",
    borderRadius: "0px",
    fontWeight: "500",
    fontSize: "15px",
    width: "220px",
    padding: "1px",
    marginTop: "5px",
    fontFamily: "Poppins",
    marginBottom: "0px",
    zIndex: "10000",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
  }),
};

export const customStyles_error = {
  control: (base, state) => ({
    ...base,
    background: "#fef1f2",
    color: "#212121",
    border: "2px solid red",
    boxShadow: "none",
    borderRadius: "5px",
    width: "100%",
    padding: "1px",
    marginTop: "5px",
    fontFamily: "Roboto",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
    fontFamily: "Inter",
    fontWeight: "600",
  }),
};

export const customStylesDirectory = {
  control: (base, state) => ({
    ...base,
    background: "white",
    color: "#212121",
    border: "2px solid lightgray",
    boxShadow:
      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
    borderRadius: "5px",
    width: "100%",
    padding: "1px",
    marginTop: "4px",
    marginBottom: "10px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
    fontFamily: "Poppins",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "gray",
      fontFamily: "Poppins",
    };
  },
  option: (provided) => ({
    ...provided,
    color: "#212121",
    fontFamily: "Poppins",
    fontSize: "14px",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "lightblue",
    },
  }),
};

export const customStylesFilter = {
  control: (base, state) => ({
    ...base,
    background: "white",
    color: "#212121",
    border: "2px solid lightgray",
    boxShadow:
      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
    borderRadius: "5px",
    width: "100%",
    padding: "1px",
    marginTop: "4px",
    marginBottom: "10px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: state.isFocused ? "#003171" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#003171" : "",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#212121",
    fontFamily: "Poppins",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "gray",
      fontFamily: "Poppins",
    };
  },
  option: (provided) => ({
    ...provided,
    color: "#212121",
    fontFamily: "Poppins",
    fontSize: "14px",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "lightblue",
    },
  }),
};

export const renderInput = (props) => (
  <input
    type="text"
    className={props.invalid ? "txtError" : "txtInput"}
    onClick={props.onClick}
    value={props.value}
    onChange={props.onChange}
  />
);

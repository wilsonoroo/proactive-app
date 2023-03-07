
import PropTypes from "prop-types";
export default function CustomDivider({ horizontal = false, vertical = false }) {

  const styleHorizontal = {
    border: 0,
    clear: "both",
    display: "block",

    backgroundColor: "black",
    height: "1px",
  }
  return (
    //<Divider style={{ paddingTop: 30, paddingBottom: 30 }} variant="fullWidth" />
    <hr style={styleHorizontal} />
  );
}
CustomDivider.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool
}

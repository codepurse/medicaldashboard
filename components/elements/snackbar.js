import { IoIosCheckmarkCircle } from "react-icons/io";
import { SnackbarContent } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { useSnackStore} from "../../store/store";
import { MdError } from "react-icons/md";
import React from "react";

export default function withSnackbar() {
  const stateAction = useSnackStore((state) => state.state);
  const setSnack = useSnackStore((state) => state.changeState);
  const message = useSnackStore((state) => state.Message);
  const styles = useSnackStore((state) => state.style);
  const styleError = {
    backgroundColor: "#FDF1F1",
    border: "1px solid #E53E3E",
  };

  const styleSuccess = {
    backgroundColor: "#F1FAF7",
    border: "1px solid #32C48E",
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={stateAction}
      onClose={() => {
        setSnack(false);
      }}
      autoHideDuration={3000}
      message={message}
    >
      <SnackbarContent
        style={styles ? styleSuccess : styleError}
        message={
          <span className={styles ? "pSnack" : "pSnackError"}>
            <i>{styles ? <IoIosCheckmarkCircle /> : <MdError />}</i>
            {message}
          </span>
        }
      />
    </Snackbar>
  );
}

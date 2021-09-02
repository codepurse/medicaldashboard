import { useSnackStore, useModalStore } from "../../store/store";
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";
import { MdError } from "react-icons/md";
import {IoIosCheckmarkCircle} from "react-icons/io";

export default function withSnackbar() {
  const [open, setOpen] = React.useState(true);
  const stateAction = useSnackStore((state) => state.state);
  const setSnack = useSnackStore((state) => state.changeState);
  const message = useSnackStore((state) => state.Message);
  const styles = useSnackStore((state) => state.style);
  const mess = useModalStore((state) => state.show);
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
            <i>{styles ? <IoIosCheckmarkCircle/> : <MdError/>}</i>
            {message}
          </span>
        }
      />
    </Snackbar>
  );
}

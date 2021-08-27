import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type AlertMessageProps = {
  open: boolean
  setOpen: Function
  severity: "error" | "success" | "info" | "warning"
  message: string
  vertical: "top" | "bottom"
  horizontal: "left" | "center" | "right"
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage = ({ open, setOpen, severity, message, vertical, horizontal}: AlertMessageProps) => {
  const handleCloseAlertMessage = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return

    setOpen(false)
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        onClose={handleCloseAlertMessage}
      >
        <Alert onClose={handleCloseAlertMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertMessage
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import { RingVolume } from "@material-ui/icons"

type MsgLeftProps = {
  message: string
  image: string | null
  icon: string
}

type MsgRightProps = {
  message: string
  image: string | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageWhite: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#EDF1EE",
      maxWidth: "60%",
      textAlign: "left",
      border: "1px solid #EDF1EE",
      borderRadius: "15px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "10px solid #EDF1EE",
        borderRight: "20px solid transparent",
        borderLeft: "10px solid transparent",
        transform: "rotate(10deg)",
        top: "6px",
        left: "-10px"
      },
    },
    messageGreen: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#8DE055",
      maxWidth: "60%",
      textAlign: "left",
      border: "1px solid #8DE055",
      borderRadius: "15px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "10px solid #8DE055",
        borderRight: "10px solid transparent",
        borderLeft: "20px solid transparent",
        transform: "rotate(-15deg)",
        top: "6px",
        right: "-10px"
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
      wordBreak: "break-all"
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    },
    postImgLeft: {
      textAlign: "left",
      marginLeft: 15,
      marginBottom: 10,
    },
    postImgRight: {
      textAlign: "right",
      marginRight: 15,
      marginBottom: 10,
    },
    imgArea: {
      maxWidth: "80%",
    }
  })
)

export const MessageLeft = (props: MsgLeftProps) => {
  const message = props.message && props.message
  const image = props.image && props.image
  const icon = props.icon && props.icon
  const classes = useStyles()
  return (
    <>
      { message && (
        <div className={classes.messageRow}>
          <Avatar
            className={classes.icon}
            src={icon}
          ></Avatar>
          <div className={classes.messageWhite}>
            <p className={classes.messageContent}>{message}</p>
          </div>
        </div>
      )}
      { image && (
        <div className={classes.messageRow}>
          <Avatar
            className={classes.icon}
            src={icon}
          ></Avatar>
          <div className={classes.postImgLeft}>
            <img className={classes.imgArea} src={image} alt="投稿画像" />
          </div>
        </div>
      )}
    </>
  )
}

export const MessageRight = (props: MsgRightProps) => {
  const classes = useStyles()
  const message = props.message && props.message
  const image = props.image && props.image
  return (
    <>
      { message && (
        <div className={classes.messageRowRight}>
          <div className={classes.messageGreen}>
            <p className={classes.messageContent}>{message}</p>
          </div>
        </div>
      )}
      { image && (
        <div className={classes.messageRowRight}>
          <div className={classes.postImgRight}>
            <img className={classes.imgArea} src={image} alt="投稿画像" />
          </div>
        </div>
      )}
    </>
  )
}

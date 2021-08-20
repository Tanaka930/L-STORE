import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"

type MsgLeftProps = {
  message: string
  image: string
  icon: string
}

type MsgRightProps = {
  message: string
  image: string
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
      marginLeft: 15,
      marginBottom: 10,
    },
    postImgRight: {
      marginRight: 15,
      marginBottom: 10,
    }
  })
)

export const MessageLeft = (props: MsgLeftProps) => {
  const message = props.message && props.message
  const image = props.image && props.image
  const icon = props.icon ? props.icon : "dummy.js";
  const classes = useStyles();
  return (
    <div className={classes.messageRow}>
      <Avatar
        className={classes.icon}
        src={icon}
      ></Avatar>
      { message && (
        <div className={classes.messageWhite}>
          <p className={classes.messageContent}>{message}</p>
        </div>
      )}
      { image && (
        <div className={classes.postImgLeft}>
          <img src={image} alt="投稿画像" />
        </div>
      )}
    </div>
  )
}

export const MessageRight = (props: MsgRightProps) => {
  const classes = useStyles()
  const message = props.message && props.message
  const image = props.image && props.image
  return (
    <div className={classes.messageRowRight}>
      { message && (
        <div className={classes.messageGreen}>
          <p className={classes.messageContent}>{message}</p>
        </div>
      )}
      { image && (
        <div className={classes.postImgRight}>
          <img src={image} alt="投稿画像" />
        </div>
      )}
    </div>
  )
}

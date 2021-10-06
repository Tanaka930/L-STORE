import { Button } from "@material-ui/core"

const PrimaryButton = (props: any) => {
  const { children } = props;
//  console.log(children)
  return (
    <>
      <Button
      style={{
        marginTop: "8px",
        marginBottom: "4px",
        fontWeight: "bold"
      }}
      variant="contained"
      color="primary"
      type="submit">
        {children}
      </Button>
    </>
  )
}

export default PrimaryButton

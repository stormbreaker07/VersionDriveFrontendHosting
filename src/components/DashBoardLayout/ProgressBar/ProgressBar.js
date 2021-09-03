
const ProgressBarContainer = (props) => {

    const percentage = props.percentage + "%";
    const myStyle = {
        width:percentage,
        height:"100%",
        backgroundColor:"#ffffff",
        // borderRight: "solid 4px #8195c5",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "1px 0px 12px 2px inset",
        transition: "background-color 500ms linear",
        opacity: "0.8"
    }

    return (
        <div style={myStyle}>
        </div>
    )
}

export default ProgressBarContainer;
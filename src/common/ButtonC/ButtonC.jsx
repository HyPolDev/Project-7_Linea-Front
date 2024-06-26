import "./ButtonC.css"
import "../../pages/Login/Login.css"

export const ButtonC = ({ title, functionEmit, className }) => {

    return (
        <div className={className}
            onClick={functionEmit}
            title={title}>{title}
        </div>
    )
}
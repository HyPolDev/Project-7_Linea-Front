import "./CInput.css"
import "../../pages/Login/Login.css"

export const CInput = ({ typeProp, nameProp, changeEmit, placeholderProp }) => {

    return (

        <input
            className="form-style"
            type={typeProp}
            name={nameProp}
            placeholder={placeholderProp}
            onChange={(e) => changeEmit}
        />
    )
}
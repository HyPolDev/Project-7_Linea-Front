import "./CInput.css"
import "../../pages/Login/Login.css"

export const CInput = ({ typeProp, nameProp, handlerProp, placeholderProp }) => {

    return (

        <input
            className="form-style"
            type={typeProp}
            name={nameProp}
            placeholder={placeholderProp}
            onChange={(e) => handlerProp(e)}
        />
    )
}
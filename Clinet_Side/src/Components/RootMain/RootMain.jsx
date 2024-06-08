import { useState } from "react";
import Root from "./Root/Root";

const RootMain = () => {
    const [propsFromChild, setPropsFromChild] = useState(null);

    const setDataToParent = data =>{
        setPropsFromChild(data)
    }
    console.log(propsFromChild)
    return (
        <div>
           <Root></Root>
           
        </div>
    );
};

export default RootMain; 
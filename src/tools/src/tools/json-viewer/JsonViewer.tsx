import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { JsonObject, JsonViewerUtils } from "./JsonViewerUtils";

interface FormValue {
    decoded: string,
    jsonObject: JsonObject | null,
}

export const JsonViewer: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        jsonObject: null,
    });

    const onViewJson = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, jsonObject: JsonViewerUtils.parse(value) });
    }

    console.log(formValue.jsonObject);
    return (
        <>
            <h1>Online Json Viewer</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Json" 
                        textarea 
                        rows={15} 
                        value={formValue.decoded}
                        onChange={onViewJson} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <div className="square border-gray rounded wordwrap px-2 py-1" style={{height: 385}}>
                        
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    )
}
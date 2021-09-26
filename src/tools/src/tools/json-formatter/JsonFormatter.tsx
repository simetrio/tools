import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { JsonFormatterUtils } from "./JsonFormatterUtils";

interface FormValue {
    decoded: string,
    encoded: string,
}

export const JsonFormatter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        encoded: '',
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: JsonFormatterUtils.format(value) });
    }

    return (
        <>
            <h1>Online Json Formatter</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Json" 
                        textarea 
                        rows={15} 
                        value={formValue.decoded}
                        onChange={onEncode} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Formatted Json" 
                        textarea 
                        rows={15} 
                        value={formValue.encoded} 
                        readonly={true}
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}
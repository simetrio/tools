import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Sha1GeneratorUtils } from "./Sha1GeneratorUtils";

interface FormValue {
    decoded: string,
    encoded: string,
}

export const Sha1Generator: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        encoded: '',
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: Sha1GeneratorUtils.encode(value) });
    }

    return (
        <>
            <h1>Online SHA1 Generator</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Text" 
                        textarea 
                        rows={15} 
                        value={formValue.decoded}
                        onChange={onEncode} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="SHA1" 
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
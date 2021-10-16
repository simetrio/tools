import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Base64EncodeDecodeUtils } from "./Base64EncodeDecodeUtils";

interface FormValue {
    decoded: string,
    encoded: string,
}

export const Base64EncodeDecode: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        encoded: '',
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: Base64EncodeDecodeUtils.encode(value) });
    }

    const onDecode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: Base64EncodeDecodeUtils.decode(value), encoded: value });
    }

    return (
        <>
            <h1>Online Base64 Encode/Decode Text</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Decoded Base64" 
                        textarea 
                        rows={20} 
                        value={formValue.decoded}
                        onChange={onEncode} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Encoded Base64" 
                        textarea 
                        rows={20} 
                        value={formValue.encoded} 
                        onChange={onDecode} 
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const UrlEncodeDecode: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: encodeURIComponent(value) });
    };

    const onDecode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: decodeURIComponent(value), encoded: value });
    };

    return (
        <>
            <h1>Online Url Encode/Decode</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Decoded Url"
                        textarea
                        rows={10}
                        value={formValue.decoded}
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Encoded Url"
                        textarea
                        rows={10}
                        value={formValue.encoded}
                        onChange={onDecode}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

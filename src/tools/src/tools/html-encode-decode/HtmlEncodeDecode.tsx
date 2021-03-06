import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { HtmlEncodeDecodeUtils } from "./HtmlEncodeDecodeUtils";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const HtmlEncodeDecode: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({
            ...formValue,
            decoded: value,
            encoded: HtmlEncodeDecodeUtils.encode(value),
        });
    };

    const onDecode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({
            ...formValue,
            decoded: HtmlEncodeDecodeUtils.decode(value),
            encoded: value,
        });
    };

    return (
        <>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Decoded Html"
                        textarea
                        rows={15}
                        value={formValue.decoded}
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Encoded Html"
                        textarea
                        rows={15}
                        value={formValue.encoded}
                        onChange={onDecode}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { TranslitFromRussianToEnglishUtils } from "./TranslitFromRussianToEnglishUtils";

interface FormValue {
    decoded: string,
    encoded: string,
}

export const TranslitFromRussianToEnglish: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        encoded: '',
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: TranslitFromRussianToEnglishUtils.encode(value) });
    }

    return (
        <>
            <h1>Online Translint From Russian To English</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Russian text" 
                        textarea 
                        rows={20} 
                        value={formValue.decoded}
                        onChange={onEncode} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Translit to English text" 
                        textarea 
                        rows={20} 
                        value={formValue.encoded} 
                        readonly={true}
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}
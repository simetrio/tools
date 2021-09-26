import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { TextDifferencesUtils } from "./TextDifferencesUtils";

interface FormValue {
    before: string,
    after: string,
    differences: string,
}

export const TextDifferences: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        before: '',
        after: '',
        differences: '',
    });

    const onChangeBefore = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, before: value, differences: TextDifferencesUtils.findDifferences(value, formValue.after) });
    }

    const onChangeAfter = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, after: value, differences: TextDifferencesUtils.findDifferences(formValue.before, value) });
    }

    const formatHtml = (value: string) => value.replace(/\n/g, "<br/>").replace(/\s\s/g, "&nbsp;&nbsp;");

    return (
        <>
            <h1>Online Finding Differences Between Texts</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Text Before" 
                        textarea 
                        rows={15} 
                        value={formValue.before}
                        onChange={onChangeBefore} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Text After" 
                        textarea 
                        rows={15} 
                        value={formValue.after}
                        onChange={onChangeAfter}
                    />
                </MDBCol>
            </MDBRow>
            <h3>Differences</h3>
            <MDBRow>
                <MDBCol md="12" className="mb-3">
                    <div className="square border-gray rounded wordwrap px-2 py-1" style={{height: 385}}>
                        <div dangerouslySetInnerHTML={{ __html: formatHtml(formValue.differences) }} />
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    )
}
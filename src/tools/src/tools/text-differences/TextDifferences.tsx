import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { TextDifferencesUtils } from "./TextDifferencesUtils";

interface FormValue {
    before: string;
    after: string;
    differences: string;
}

export const TextDifferences: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        before: "",
        after: "",
        differences: "",
    });

    const executeAsync = (action: () => void): void => {
        window.setTimeout(action, 1);
    };

    const findDifferences = (before: string, after: string): void => {
        setFormValue({
            ...formValue,
            before,
            after,
            differences: "loading...",
        });
        executeAsync(() => {
            setFormValue({
                ...formValue,
                before,
                after,
                differences: TextDifferencesUtils.findDifferences(before, after),
            });
        });
    };

    const onChangeBefore = (e: any) => {
        findDifferences(e.currentTarget.value || "", formValue.after);
    };

    const onChangeAfter = (e: any) => {
        findDifferences(formValue.before, e.currentTarget.value || "");
    };

    const formatHtml = (value: string) =>
        value.replace(/\n/g, "<br/>").replace(/\s\s/g, "&nbsp;&nbsp;");

    return (
        <>
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
                    <div
                        className="square border-gray rounded wordwrap px-2 py-1"
                        style={{ height: 385 }}
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: formatHtml(formValue.differences) }}
                        />
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    );
};

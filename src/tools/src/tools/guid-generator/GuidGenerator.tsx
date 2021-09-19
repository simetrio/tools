import { MDBBtn, MDBCheckbox, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { GuidGeneratorUtils } from "./GuidGeneratorUtils";

interface FormValue {
    count: number,
    uppercase: boolean,
    braces: boolean,
    hypens: boolean,
    value: string[],
}

export const GuidGenerator: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        count: 1,
        uppercase: false,
        braces: false,
        hypens: true,
        value: [],
    });

    const onChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const onChangeBoolean = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.currentTarget.checked });
    };

    const onGenerate = () => {
        setFormValue({ ...formValue, value: GuidGeneratorUtils.generate(formValue) });
    }

    return (
        <>
            <h1>Online Guid generator</h1>
            <MDBCol md="4" className="mb-3">
                <MDBInput
                    value={formValue.count.toString()}
                    name="count"
                    id="count"
                    label="How many?"
                    onChange={onChange}
                />
            </MDBCol>

            <MDBCol md="4" className="mb-3">
                <MDBCheckbox
                    name="uppercase" 
                    id="uppercase" 
                    label="Uppercase"
                    onClick={onChangeBoolean}
                    defaultChecked={formValue.uppercase}
                />
            </MDBCol>

            <MDBCol md="4" className="mb-3">
                <MDBCheckbox
                    name="braces" 
                    id="braces" 
                    label="Braces"
                    onClick={onChangeBoolean}
                    defaultChecked={formValue.braces}
                />
            </MDBCol>

            <MDBCol md="4" className="mb-3">
                <MDBCheckbox
                    name="hypens"
                    id="hypens" 
                    label="Hypens"
                    onClick={onChangeBoolean}
                    defaultChecked={formValue.hypens}
                />
            </MDBCol>

            <MDBCol md="4" className="mb-3">
                <MDBBtn onClick={onGenerate}>Generate</MDBBtn>
            </MDBCol>

            <MDBCol md="4" className="mb-3">
                <MDBInput label="Generated Guids" textarea rows={10} value={formValue.value.join("\n")} />
            </MDBCol>
        </>
    )
}
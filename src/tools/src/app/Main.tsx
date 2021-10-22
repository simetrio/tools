import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { AllRoutes } from "./Routes";

interface FormValue {
    search: string;
}

export const Main: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        search: "",
    });

    const onSearch = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, search: value });
    };

    const contains = (value1: string, value2: string) => {
        return value1.toLocaleLowerCase().includes(value2.toLocaleLowerCase());
    };

    const routes = formValue.search
        ? AllRoutes.filter((x) => contains(x.name, formValue.search))
        : AllRoutes;

    return (
        <>
            <div className="m-4 mt-2">
                <MDBInput label="Search" value={formValue.search} onChange={onSearch} />
            </div>
            <MDBRow>
                {routes.map((x) => (
                    <MDBCol md="3" className="text-center my-2">
                        <MDBBtn href={`/tools/${x.url}/`} tag="a">
                            {x.name}
                        </MDBBtn>
                    </MDBCol>
                ))}
            </MDBRow>
        </>
    );
};

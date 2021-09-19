import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit"
import { AllRoutes } from "./Routes"

export const Main: React.FC = () => {
    return (
        <MDBRow>
            {AllRoutes.map(x => (
                <MDBCol md="3" className="text-center my-2">
                    <MDBBtn href={`/tools/${x.url}/`} tag="a">{x.name}</MDBBtn>
                </MDBCol>
            ))}
        </MDBRow>
    )
}
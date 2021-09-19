import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { GuidGeneratorRoute, UrlEncoderRoute } from "./Routes";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { UrlEncoder } from "../tools/url-encoder/UrlEncoder";

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/tools" component={ToolsRouter} />
            <Redirect to="/" />
        </Switch>
    )
}

const ToolsRouter: React.FC<RouteComponentProps> = (props) => {
    return (
        <Switch>
            <Route path={`${props.match.url}/${GuidGeneratorRoute.url}`} component={GuidGenerator} />
            <Route path={`${props.match.url}/${UrlEncoderRoute.url}`} component={UrlEncoder} />
            <Redirect to="/" />
        </Switch>
    )
}

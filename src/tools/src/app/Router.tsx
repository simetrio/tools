import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { GuidGeneratorRoute, HtmlEncodeDecodeRoute, UrlEncodeDecodeRoute } from "./Routes";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";

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
            <Route path={`${props.match.url}/${UrlEncodeDecodeRoute.url}`} component={UrlEncodeDecode} />
            <Route path={`${props.match.url}/${HtmlEncodeDecodeRoute.url}`} component={HtmlEncodeDecode} />
            <Redirect to="/" />
        </Switch>
    )
}

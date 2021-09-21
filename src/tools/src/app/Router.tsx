import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { 
    Base64EncodeDecodeRoute, 
    GuidGeneratorRoute, 
    HtmlEncodeDecodeRoute, 
    UrlEncodeDecodeRoute 
} from "./Routes";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";

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
            <Route path={`${props.match.url}/${Base64EncodeDecodeRoute.url}`} component={Base64EncodeDecode} />
            <Redirect to="/" />
        </Switch>
    )
}

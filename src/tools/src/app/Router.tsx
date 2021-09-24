import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { 
    Base64EncodeDecodeRoute, 
    GuidGeneratorRoute, 
    HtmlEncodeDecodeRoute, 
    Sha256GeneratorRoute, 
    TranslitFromRussianToEnglishRoute, 
    UrlEncodeDecodeRoute 
} from "./Routes";
import { TranslitFromRussianToEnglish } from "../tools/translit-from-russian-to-english/TranslitFromRussianToEnglish";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";
import { Sha256Generator } from "../tools/sha256-generator/Sha256Generator";

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
            <Route path={`${props.match.url}/${TranslitFromRussianToEnglishRoute.url}`} component={TranslitFromRussianToEnglish} />
            <Route path={`${props.match.url}/${GuidGeneratorRoute.url}`} component={GuidGenerator} />
            <Route path={`${props.match.url}/${UrlEncodeDecodeRoute.url}`} component={UrlEncodeDecode} />
            <Route path={`${props.match.url}/${HtmlEncodeDecodeRoute.url}`} component={HtmlEncodeDecode} />
            <Route path={`${props.match.url}/${Base64EncodeDecodeRoute.url}`} component={Base64EncodeDecode} />
            <Route path={`${props.match.url}/${Sha256GeneratorRoute.url}`} component={Sha256Generator} />
            <Redirect to="/" />
        </Switch>
    )
}

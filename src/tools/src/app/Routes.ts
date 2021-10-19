import { RouteComponentProps } from "react-router";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";
import { Base64EncodeFileOrImage } from "../tools/base64-encode-file-or-image/Base64EncodeFileOrImage";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { JsonFormatter } from "../tools/json-formatter/JsonFormatter";
import { JsonViewer } from "../tools/json-viewer/JsonViewer";
import { LoanCalculator } from "../tools/loan-calculator/LoanCalculator";
import { Md5Generator } from "../tools/md5-generator/Md5Generator";
import { Sha1Generator } from "../tools/sha1-generator/Sha1Generator";
import { Sha256Generator } from "../tools/sha256-generator/Sha256Generator";
import { TextDifferences } from "../tools/text-differences/TextDifferences";
import { TranslitFromRussianToEnglish } from "../tools/translit-from-russian-to-english/TranslitFromRussianToEnglish";
import { UnitConverter } from "../tools/unit-converter/UnitConverter";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";

export interface Route {
    url: string;
    name: string;
    title: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}

export const AllRoutes: Route[] = [
    {
        url: "json-viewer",
        name: "Json Viewer",
        title: "Online Json Viewer - Olrix Tools",
        component: JsonViewer,
    },
    {
        url: "json-formatter",
        name: "Json Formatter",
        title: "Online Json Formatter - Olrix Tools",
        component: JsonFormatter,
    },
    {
        url: "text-differences",
        name: "Differences Between Texts",
        title: "Online Finding Differences Between Texts - Olrix Tools",
        component: TextDifferences,
    },
    {
        url: "translit-from-russian-to-english",
        name: "Translit From Russian",
        title: "Online Translint From Russian To English - Olrix Tools",
        component: TranslitFromRussianToEnglish,
    },
    {
        url: "unit-converter",
        name: "Unit Converter",
        title: "Online Unit Converter - Olrix Tools",
        component: UnitConverter,
    },
    {
        url: "loan-calculator",
        name: "Loan Calculator",
        title: "Online Loan Calculator - Olrix Tools",
        component: LoanCalculator,
    },
    {
        url: "guid-generator",
        name: "Guid Generator",
        title: "Online Guid Generator - Olrix Tools",
        component: GuidGenerator,
    },
    {
        url: "url-encode-decode",
        name: "Url Encode/Decode",
        title: "Online Url Encode/Decode - Olrix Tools",
        component: UrlEncodeDecode,
    },
    {
        url: "html-encode-decode",
        name: "Html Encode/Decode",
        title: "Online Html Encode/Decode - Olrix Tools",
        component: HtmlEncodeDecode,
    },
    {
        url: "base64-encode-decode",
        name: "Base64 Encode/Decode Text",
        title: "Online Base64 Encode/Decode Text - Olrix Tools",
        component: Base64EncodeDecode,
    },
    {
        url: "base64-encode-file-or-image",
        name: "Base64 Encode File Or Image",
        title: "Online Base64 Encode File Or Image - Olrix Tools",
        component: Base64EncodeFileOrImage,
    },
    {
        url: "md5-generator",
        name: "MD5 Generator",
        title: "Online MD5 Generator - Olrix Tools",
        component: Md5Generator,
    },
    {
        url: "sha1-generator",
        name: "SHA1 Generator",
        title: "Online SHA1 Generator - Olrix Tools",
        component: Sha1Generator,
    },
    {
        url: "sha256-generator",
        name: "SHA256 Generator",
        title: "Online SHA256 Generator - Olrix Tools",
        component: Sha256Generator,
    },
];

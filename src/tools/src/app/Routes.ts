import { RouteComponentProps } from "react-router";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";
import { Base64EncodeFileOrImage } from "../tools/base64-encode-file-or-image/Base64EncodeFileOrImage";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { JavaScriptOnlineEditor } from "../tools/javascript-online-editor/JavaScriptOnlineEditor";
import { JsonFormatter } from "../tools/json-formatter/JsonFormatter";
import { JsonViewer } from "../tools/json-viewer/JsonViewer";
import { LoanCalculator } from "../tools/loan-calculator/LoanCalculator";
import { Md5Generator } from "../tools/md5-generator/Md5Generator";
import { Sha1Generator } from "../tools/sha1-generator/Sha1Generator";
import { Sha256Generator } from "../tools/sha256-generator/Sha256Generator";
import { TextDifferences } from "../tools/text-differences/TextDifferences";
import { TranslitFromRussianToEnglish } from "../tools/translit-from-russian-to-english/TranslitFromRussianToEnglish";
import { UnicodeToUtf8Converter } from "../tools/unicode-to-utf8-converter/UnicodeToUtf8Converter";
import { UnitConverter } from "../tools/unit-converter/UnitConverter";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { WordCounter } from "../tools/word-counter/WordCounter";

export interface Route {
    url: string;
    name: string;
    title: string;
    h1: string;
    text: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}

export const AllRoutes: Route[] = [
    {
        url: "base64-encode-decode",
        name: "Base64 Encode/Decode Text",
        title: "Online Base64 Encode/Decode Text - Olrix Tools",
        h1: "Online Base64 Encode/Decode Text",
        text: "<p>Base64 - encoding an array of bytes 64 using ASCII characters. The characters used are A-Z, a-z, 0-9, +, /. Every 3 bytes are encoded with 4 characters.</p> <h2>Encode text to Base64</h2> <p>The text is first converted to UTF8 encoding, then the bytes are encoded in Base64. Base64 text encoding is used in web applications to encode javascript and css files.</p> <h2>How is Base64 encoded</h2> <p>First, 3 characters (24 bits) are taken and divided by 4 numbers of 6 bits each. These numbers are indices for the string 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'. If less than 3 characters are used, the remaining characters are padded with '='.</p> <h2>Text encode examples:</h2> <p>Hellow World = SGVsbG93IFdvcmxk <br /> It was beautiful = SXQgd2FzIGJlYXV0aWZ1bA​​==</p>",
        component: Base64EncodeDecode,
    },
    {
        url: "base64-encode-file-or-image",
        name: "Base64 Encode File Or Image",
        title: "Online Base64 Encode File Or Image - Olrix Tools",
        h1: "Online Base64 Encode File Or Image",
        text: "",
        component: Base64EncodeFileOrImage,
    },
    {
        url: "guid-generator",
        name: "Guid Generator",
        title: "Online Guid Generator - Olrix Tools",
        h1: "Online Guid Generator",
        text: "<h2>What is a GUID?</h2> <p>This is a unique 128-bit identifier. Its peculiarity is uniqueness, it allows you to generate random identifiers without the risk of repetition. The total number of GUID keys is very large (2<sup>128</sup>). The abbreviation GUID was introduced by Microsoft. The rest of the world uses the term UUID.</p> <h2>What does a GUID look like?</h2> <p>Consists of thirty-two hexadecimal digits, separated by hyphens. They can also be surrounded by curly braces. For example: 2170abcb-8499-47de-be64-8cc8b290ebd5</p> <h2>How is it used?</h2> <p>GUID is used as a unique identifier in programming as keys in a database. Due to the high uniqueness of the UUID, when generating it, you don't have to worry about checking duplicates.</p>",
        component: GuidGenerator,
    },
    {
        url: "html-encode-decode",
        name: "Html Encode/Decode",
        title: "Online Html Encode/Decode - Olrix Tools",
        h1: "Online Html Encode/Decode",
        text: "",
        component: HtmlEncodeDecode,
    },
    {
        url: "javascript-online-editor",
        name: "JavaScript Editor",
        title: "Online JavaScript Editor - Olrix Tools",
        h1: "Online JavaScript Editor",
        text: "",
        component: JavaScriptOnlineEditor,
    },
    {
        url: "json-formatter",
        name: "Json Formatter",
        title: "Online Json Formatter - Olrix Tools",
        h1: "Online Json Formatter",
        text: "",
        component: JsonFormatter,
    },
    {
        url: "json-viewer",
        name: "Json Viewer",
        title: "Online Json Viewer - Olrix Tools",
        h1: "Online Json Viewer",
        text: "",
        component: JsonViewer,
    },
    {
        url: "loan-calculator",
        name: "Loan Calculator",
        title: "Online Loan Calculator - Olrix Tools",
        h1: "Online Loan Calculator",
        text: "",
        component: LoanCalculator,
    },
    {
        url: "md5-generator",
        name: "MD5 Generator",
        title: "Online MD5 Generator - Olrix Tools",
        h1: "Online MD5 Generator",
        text: "",
        component: Md5Generator,
    },
    {
        url: "sha1-generator",
        name: "SHA1 Generator",
        title: "Online SHA1 Generator - Olrix Tools",
        h1: "Online SHA1 Generator",
        text: "",
        component: Sha1Generator,
    },
    {
        url: "sha256-generator",
        name: "SHA256 Generator",
        title: "Online SHA256 Generator - Olrix Tools",
        h1: "Online SHA256 Generator",
        text: "",
        component: Sha256Generator,
    },
    {
        url: "text-differences",
        name: "Differences Between Texts",
        title: "Online Finding Differences Between Texts - Olrix Tools",
        h1: "Online Finding Differences Between Texts",
        text: "",
        component: TextDifferences,
    },
    {
        url: "translit-from-russian-to-english",
        name: "Translit From Russian",
        title: "Online Translint From Russian To English - Olrix Tools",
        h1: "Online Translint From Russian To English",
        text: "",
        component: TranslitFromRussianToEnglish,
    },
    {
        url: "unicode-to-utf8-converter",
        name: "Unicode To UTF8 Converter",
        title: "Online Unicode To UTF8 Converter - Olrix Tools",
        h1: "Online Unicode To UTF8 Converter",
        text: "",
        component: UnicodeToUtf8Converter,
    },
    {
        url: "unit-converter",
        name: "Unit Converter",
        title: "Online Unit Converter - Olrix Tools",
        h1: "Online Unit Converter",
        text: "",
        component: UnitConverter,
    },
    {
        url: "url-encode-decode",
        name: "Url Encode/Decode",
        title: "Online Url Encode/Decode - Olrix Tools",
        h1: "Online Url Encode/Decode",
        text: "",
        component: UrlEncodeDecode,
    },
    {
        url: "word-counter",
        name: "Word Counter",
        title: "Online Word Counter - Olrix Tools",
        h1: "Online Word Counter",
        text: "",
        component: WordCounter,
    },
];

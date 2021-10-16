/npm run build
PublishTools.exe -mode DeleteDirectory --name "../../docs"
PublishTools.exe -mode CopyDirectory --from "build" --to "../../docs"
/pause
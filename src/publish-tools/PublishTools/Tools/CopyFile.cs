using System;
using System.IO;

namespace PublishTools.Tools
{
    public class CopyFile : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            Console.WriteLine($"Copy file from '{from}' to '{to}'");

            var fromFileInfo = new FileInfo(from);
            var fromDir = fromFileInfo.Directory
                          ?? throw new ArgumentNullException(nameof(fromFileInfo.Directory));
            var toDir = new DirectoryInfo(to);

            var newFilePath = fromFileInfo.FullName.Replace(fromDir.FullName, toDir.FullName);
            File.Copy(fromFileInfo.FullName, newFilePath, true);
        }
    }
}
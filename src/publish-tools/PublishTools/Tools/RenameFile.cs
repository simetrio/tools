using System;
using System.IO;

namespace PublishTools.Tools
{
    public class RenameFile : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            Console.WriteLine($"Move file from '{from}' to '{to}'");

            var fromFileInfo = new FileInfo(from);
            var fromDir = fromFileInfo.Directory
                          ?? throw new ArgumentNullException(nameof(fromFileInfo.Directory));

            var newFilePath = Path.Combine(fromDir.FullName, to);
            File.Move(fromFileInfo.FullName, newFilePath, true);
        }
    }
}
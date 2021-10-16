using System;
using System.IO;

namespace PublishTools.Tools
{
    public class CopyDirectory : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            Console.WriteLine($"Copy directory from '{from}' to '{to}'");

            var fromDir = new DirectoryInfo(from);
            var toDir = new DirectoryInfo(to);
            
            if (Directory.Exists(from))
            {
                foreach (var dirPath in Directory.GetDirectories(fromDir.FullName, "*", SearchOption.AllDirectories))
                {
                    var newDirPath = dirPath.Replace(fromDir.FullName, toDir.FullName);
                    if (!Directory.Exists(newDirPath))
                    {
                        Directory.CreateDirectory(newDirPath);
                    }
                }

                foreach (var filePath in Directory.GetFiles(fromDir.FullName, "*.*",SearchOption.AllDirectories))
                {
                    var newFilePath = filePath.Replace(fromDir.FullName, toDir.FullName);
                    File.Copy(filePath, newFilePath, true);
                }
            }
        }
    }
}
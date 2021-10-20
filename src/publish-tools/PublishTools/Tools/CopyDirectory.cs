using System;
using System.IO;
using System.Linq;

namespace PublishTools.Tools
{
    public class CopyDirectory : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            var exclude = (commandLine.TryGet("--exclude") ?? "")
                .Split(',', StringSplitOptions.RemoveEmptyEntries);
            Console.WriteLine($"Copy directory from '{from}' to '{to}'");

            var fromDir = new DirectoryInfo(from);
            var toDir = new DirectoryInfo(to);

            bool IsNotExclude(string path) => !exclude.Any(path.Contains);
            
            if (Directory.Exists(from))
            {
                var directoriesToCreate = Directory
                    .GetDirectories(fromDir.FullName, "*", SearchOption.AllDirectories)
                    .Where(IsNotExclude);
                
                foreach (var dirPath in directoriesToCreate)
                {
                    var newDirPath = dirPath.Replace(fromDir.FullName, toDir.FullName);
                    if (!Directory.Exists(newDirPath))
                    {
                        Directory.CreateDirectory(newDirPath);
                    }
                }
                
                var filesToCreate = Directory
                    .GetFiles(fromDir.FullName, "*.*",SearchOption.AllDirectories)
                    .Where(IsNotExclude);

                foreach (var filePath in filesToCreate)
                {
                    var newFilePath = filePath.Replace(fromDir.FullName, toDir.FullName);
                    File.Copy(filePath, newFilePath, true);
                }
            }
        }
    }
}
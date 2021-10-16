using System;
using System.IO;

namespace PublishTools.Tools
{
    public class DeleteDirectory : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var dirName = commandLine.Get("--name");
            Console.WriteLine($"Delete directory '{dirName}'");
            
            if (Directory.Exists(dirName))
            {
                Directory.Delete(dirName, true);
            }
        }
    }
}
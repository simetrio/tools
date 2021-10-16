using System;

namespace PublishTools.Tools
{
    public class Nope : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            Console.WriteLine("Nope");
        }
    }
}
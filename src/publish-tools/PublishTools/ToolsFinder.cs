using System;
using System.Linq;

namespace PublishTools
{
    public class ToolsFinder
    {
        public static ITools Find(CommandLine commandLine)
        {
            var name = commandLine.Get("-mode");
            var type = typeof(ToolsFinder)
                .Assembly
                .GetTypes()
                .Single(x => x.Name == name);
            return Activator.CreateInstance(type) as ITools;
        }
    }
}
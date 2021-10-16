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
                .SingleOrDefault(x => x.Name == name) 
                       ?? throw new ArgumentOutOfRangeException(nameof(name), $"Tools with name '{name}' not found");
            return Activator.CreateInstance(type) as ITools;
        }
    }
}
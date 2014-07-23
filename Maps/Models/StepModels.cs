using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maps.Models
{
    public enum StepEnum
    {
        One = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5
    }

    public enum SubStepEnum
    {
        First = 1,
        Second = 2,
        Third = 3,
        Fourth = 4
    }

    public class StepsViewModel
    {
        public StepEnum SelectedStep { get; set; }
        public SubStepEnum? SelectedSubStep { get; set; }
    }
}
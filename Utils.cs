using System;
using System.Linq;
using System.Collections.Generic;
using MathNet.Numerics.Distributions;

namespace hiddenGems {
    public static class Utils {
        public static T uniformFromArray<T>(T[] items) {
            double[] weights = (from i in Enumerable.Range(1,items.Length) select 1.0d).ToArray();
            int idx = Categorical.Sample(weights);
            return items[idx];
        }
    }
}
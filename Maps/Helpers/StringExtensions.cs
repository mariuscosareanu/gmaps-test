using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maps.Helpers
{
    public static class StringExtensions
    {
        public static string ToUpperFirstLetter(this string @this)
        {
            if (string.IsNullOrEmpty(@this))
            {
                return @this;
            }

            return char.ToUpper(@this[0]) + (@this.Length > 1 ? @this.Substring(1).ToLower() : string.Empty);
        }
    }
}
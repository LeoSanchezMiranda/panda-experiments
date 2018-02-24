using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace NaturalComparerTest
{
    public class NaturalComparer : Comparer<string>, IDisposable
    {
        private Dictionary<string, string[]> table;

        public NaturalComparer()
        {
            table = new Dictionary<string, string[]>();
        }

        public void Dispose()
        {
            table.Clear();
            table = null;
        }

        public override int Compare(string wordA, string wordB)
        {
            if (wordA == wordB)
            {
                return 0;
            }

            string[] x1, y1;

            if (table.TryGetValue(wordA, out x1) == false)
            {
                x1 = Regex.Split(wordA.Replace(" ", ""), @"(-?((\d+\.?\d*)|(\.\d+)))");
                table.Add(wordA, x1);
            }

            if (table.TryGetValue(wordB, out y1) == false)
            {
                y1 = Regex.Split(wordB.Replace(" ", ""), @"(-?((\d+\.?\d*)|(\.\d+)))");
                table.Add(wordB, y1);
            }

            for (int i = 0; i < x1.Length && i < y1.Length; i++)
            {
                if (x1[i] != y1[i])
                {
                    return PartCompare(x1[i], y1[i]);
                }
            }

            if (y1.Length > x1.Length)
            {
                return 1;
            }

            if (x1.Length > y1.Length)
            {
                return -1;
            }
            
            return 0;
        }

        private static int PartCompare(string left, string right)
        {
            decimal x, y;

            if (decimal.TryParse(left, out x) == false)
            {
                return left.CompareTo(right);
            }

            if (decimal.TryParse(right, out y) == false)
            {
                return left.CompareTo(right);
            }

            return x.CompareTo(y);
        }
    }
}
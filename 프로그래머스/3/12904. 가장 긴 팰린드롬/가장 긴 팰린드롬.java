class Solution
{
    public int solution(String s)
    {
        int answer = 1;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            int k = 1;
            int count = 1;

            while (i - k >= 0 && i + k < n) {
                if (s.charAt(i - k) != s.charAt(i + k)) break;

                count += 2;
                k++;
            }

            answer = Math.max(answer, count);

            if (i + 1 < n && s.charAt(i) == s.charAt(i + 1)) {
                k = 1;
                count = 2;

                while (i - k >= 0 && i + k + 1 < n) {
                    if (s.charAt(i - k) != s.charAt(i + k + 1)) break;

                    count += 2;
                    k++;
                }

                answer = Math.max(answer, count);
            }
        }

        return answer;
    }
}
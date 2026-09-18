import java.util.*;

class Solution {
    public long solution(int n, int[] times) {
        long answer = 0;
        
        Arrays.sort(times);
        int m = times.length;
        
        long right = (long) n * times[0];
        long left = 0;
        
        while (left < right) {
            long mid = left + (right - left) / 2;
            
            long count = 0;
            
            for (int time : times) {
                count += (long) mid / time;
                
                if (count >= n) break;
            }
            
            if (count >= n) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        answer = left;
        
        return answer;
    }
}
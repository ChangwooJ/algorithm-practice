class Solution {    
    public int solution(int[] stones, int k) {
        int answer = 0;
        int left = 1;
        int right = 200000000;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (canCross(stones, k, mid)) {
                answer = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return answer;
    }
    
    private boolean canCross(int[] stones, int k, int p) {
        int count = 0;
        
        for (int stone : stones) {
            if (stone < p) {
                count++;
                if (count >= k) {
                    return false;
                }
            }
            else {
                count = 0;
            }
        }
        
        return true;
    }
}
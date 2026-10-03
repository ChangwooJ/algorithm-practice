import java.util.*;

class Solution {
    public int solution(int[] priorities, int location) {
        int answer = 0;
        
        Queue<int[]> q = new ArrayDeque<>();
        
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(b, a)
        );
        for (int i = 0; i < priorities.length; i++) {
            int pr = priorities[i];
            q.offer(new int[]{pr, location == i ? 1 : 0});
            pq.offer(pr);
        }
        
        while (!pq.isEmpty()) {
            int cur = pq.poll();
            
            while (true) {
                int curq[] = q.poll();
                if (curq[0] == cur) {
                    answer++;
                    if (curq[1] == 1) {
                        return answer;
                    }
                    break;
                }
                q.offer(curq);
            }           
            
        }
        
        
        return answer;
    }
}
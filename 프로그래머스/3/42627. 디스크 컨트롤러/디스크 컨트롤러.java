import java.util.*;

class Solution {
    public int solution(int[][] jobs) {
        int answer = 0;
        int time = 0;
        int index = 0;
        int leftJob = 0;
        int n = jobs.length;
        
        Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> {
                if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
                else return Integer.compare(a[0], b[0]);
            }
        );
        
        while (index < n || !pq.isEmpty()) {
            while (index < n && jobs[index][0] <= time) {
                pq.offer(jobs[index++]);
            }

            if (!pq.isEmpty()) {
                int[] cur = pq.poll();

                answer += time + cur[1] - cur[0];
                time += cur[1];

            } else {
                time = jobs[index][0];
            }
        }
        
        return answer / n;
    }
}
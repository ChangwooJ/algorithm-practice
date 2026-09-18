import java.util.*;

class Solution {
    static final int MAX = Integer.MAX_VALUE;
    static final int[] dx = {1, 0, -1, 0};
    static final int[] dy = {0, -1, 0, 1};
    
    public int solution(int[][] board) {
        int answer = 0;
        int n = board[0].length;
        
        int[][][] cost = new int[n][n][4];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                Arrays.fill(cost[i][j], MAX);
            }
        }
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[0], b[0])
        );
        
        pq.offer(new int[]{0, 0, 0, -1});
        
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            
            int curCost = cur[0];
            int x = cur[1];
            int y = cur[2];
            int dir = cur[3];
            
            if (x == n - 1 && y == n - 1) {
                return curCost;
            }
            
            if (dir != -1 && curCost > cost[x][y][dir]) continue;
            
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                
                if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
                if (board[nx][ny] == 1) continue;
                
                int nextCost;
                
                if (dir == -1 || dir == i) {
                    nextCost = curCost + 100;
                } else {
                    nextCost = curCost + 600;
                }
                
                if (nextCost < cost[nx][ny][i]) {
                    cost[nx][ny][i] = nextCost;
                    
                    pq.offer(new int[]{nextCost, nx, ny, i});
                }
            }
        }
        
        return -1;
    }
}
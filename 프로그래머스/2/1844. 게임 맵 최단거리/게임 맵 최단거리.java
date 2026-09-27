import java.util.*;

class Solution {
    private static int[] dx = {1, 0, -1, 0};
    private static int[] dy = {0, -1, 0, 1}; 
    private static boolean[][] visited;
    private static int n;
    private static int m;
    
    public int solution(int[][] maps) {
        int answer = 0;
        n = maps[0].length;
        m = maps.length;
        
        visited = new boolean[m][n];
        
        answer = bfs(maps);
        
        return answer;
    }
    
    private static int bfs(int[][] maps) {
        PriorityQueue<int[]> queue = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[2], b[2])
        );
        queue.offer(new int[]{0, 0, 1});
        visited[0][0] = true;
        
        while (!queue.isEmpty()) {
            int[] node = queue.poll();
            int x = node[1];
            int y = node[0];
            int dist = node[2];
            
            if (x == n - 1 && y == m - 1) return dist;
            
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                
                if (nx < 0 || nx >= n || ny < 0 || ny >= m || visited[ny][nx] || maps[ny][nx] == 0) continue;
                
                queue.offer(new int[]{ny, nx, dist + 1});
                visited[ny][nx] = true;
            }
        }
        
        return -1;
    }
}
import java.util.*;

class Solution {
    static Map<Integer, List<Integer>> dMap = new HashMap<>();
    
    public int solution(int n, int[][] edge) {
        int answer = 0;
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
        for (int[] e : edge) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }
        
        int max = bfs(graph, n);
        
        return dMap.get(max).size();
    }
    
    private int bfs(List<List<Integer>> graph, int n) {
        int max = 0;
        boolean[] visited = new boolean[n + 1];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{1, 0});
        visited[1] = true;
        
        dMap.computeIfAbsent(0, k -> new ArrayList<>()).add(1);
        
        while(!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0], dist = cur[1];
            
            for (int g : graph.get(node)) {
                if (visited[g]) continue;
                visited[g] = true;
                q.offer(new int[]{g, dist + 1});
                max = Math.max(max, dist + 1);
                dMap.computeIfAbsent(
                    dist + 1,
                    k -> new ArrayList<>()
                ).add(g);
            }
        }
        
        return max;
    }
}
import java.util.*;

class Solution {
    private class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    public int solution(int n, int[][] costs) {
        int answer = 0;
        List<List<Edge>> graph = new ArrayList<>();
        for(int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for(int[] cost : costs) {
            graph.get(cost[0]).add(new Edge(cost[1], cost[2]));
            graph.get(cost[1]).add(new Edge(cost[0], cost[2]));
        }
        
        answer = solve(graph, n);
        
        return answer;
    }
    
    private int solve(List<List<Edge>> graph, int n) {
        int total = 0;
        boolean[] visited = new boolean[n];
        PriorityQueue<Edge> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a.weight, b.weight)
        );
        
        visited[0] = true;
        for(Edge g : graph.get(0)) {
            pq.offer(new Edge(g.to, g.weight));
        }
        
        while(!pq.isEmpty()) {
            Edge cur = pq.poll();
            int node = cur.to, cost = cur.weight;
            
            if (visited[node]) continue;
            
            visited[node] = true;
            total += cost;
            
            for(Edge g : graph.get(node)) {
                if (visited[g.to]) continue;
                pq.offer(new Edge(g.to, g.weight));
            }
        }
        
        return total;
    }
}
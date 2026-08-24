import java.util.*;

class Solution {
    public class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    public int solution(int n, int s, int a, int b, int[][] fares) {
        int answer = Integer.MAX_VALUE;
        
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
        for (int[] fare : fares) {
            graph.get(fare[0]).add(new Edge(fare[1], fare[2]));
            graph.get(fare[1]).add(new Edge(fare[0], fare[2]));
        }
        
        int[] mdist = dijkstra(graph, s, n);
        int[] adist = dijkstra(graph, a, n);
        int[] bdist = dijkstra(graph, b, n);
        
        for(int i = 1; i <= n; i++) {
            int sum = mdist[i] + adist[i] + bdist[i];
            
            answer = Math.min(sum, answer);
        }
        
        return answer;
    }
    
    private int[] dijkstra(List<List<Edge>> graph, int start, int n) {
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[1], b[1])
        );
        pq.offer(new int[]{start, 0});
        
        while(!pq.isEmpty()) {
            int[] cur = pq.poll();
            int node = cur[0], cost = cur[1];
                        
            if(cost > dist[node]) continue;
            
            for(Edge g : graph.get(node)) {
                int next = cost + g.weight;
                if(next < dist[g.to]) {
                    dist[g.to] = next;
                    pq.offer(new int[]{g.to, next});
                }
            }
        }
        
        return dist;
    }
}
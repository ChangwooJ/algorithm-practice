import java.util.*;

class Solution {
    public class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    public int[] solution(int n, int[][] roads, int[] sources, int destination) {
        int[] answer = new int[sources.length];
        
        List<List<Edge>> graph = new ArrayList<>();
        for(int i = 0; i <= n; i++) graph.add(new ArrayList<>());
        for(int[] road : roads) {
            graph.get(road[0]).add(new Edge(road[1], 1));
            graph.get(road[1]).add(new Edge(road[0], 1));
        }
        
        int[] dist = dijkstra(graph, destination, n);
        
        for(int i = 0; i < sources.length; i++) {
            answer[i] = dist[sources[i]] != Integer.MAX_VALUE ? dist[sources[i]] : -1;
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
            int cur[] = pq.poll();
            int node = cur[0], cost = cur[1];
            
            if (cost > dist[node]) continue;
            
            for(Edge g : graph.get(node)) {
                int next = cost + g.weight;
                if (next < dist[g.to]) {
                    dist[g.to] = next;
                    pq.offer(new int[]{g.to, next});
                }
            }
        }
        
        return dist;
    }
}
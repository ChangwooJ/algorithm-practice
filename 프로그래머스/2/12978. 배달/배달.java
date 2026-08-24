import java.util.*;

class Solution {
    static class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    public int solution(int N, int[][] road, int K) {
        int answer = 0;
        
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i <= N; i++) graph.add(new ArrayList<>());
        
        for (int i = 0; i < road.length; i++) {
            graph.get(road[i][0]).add(new Edge(road[i][1], road[i][2]));
            graph.get(road[i][1]).add(new Edge(road[i][0], road[i][2]));
        }
        
        int[] dist = dijkstra(graph, 1, N);
        
        for (int i = 1; i <= N; i++) {
            if (dist[i] <= K) {
                answer++;
            }
        }

        return answer;
    }
    
    
    private int[] dijkstra(List<List<Edge>> graph, int start, int N) {
        int[] dist = new int[N + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[1], b[1])
        );
        pq.offer(new int[]{start, 0});
        
        while(!pq.isEmpty()) {
            int[] cur = pq.poll();
            int node = cur[0], cost = cur[1];
            
            if (cost > dist[node]) continue;
            
            for (Edge e : graph.get(node)) {
                int next = cost + e.weight;
                if (next < dist[e.to]) {
                    dist[e.to] = next;
                    pq.offer(new int[]{e.to, next});
                }
            }
        }
        
        return dist;
    }
}

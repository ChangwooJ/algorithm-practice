import java.util.*;

class Solution {
    static Map<String, PriorityQueue<String>> graph = new HashMap<>();
    static List<String> places = new ArrayList<>();
    
    public String[] solution(String[][] tickets) {
        for (String[] ticket : tickets) {
            graph.computeIfAbsent(ticket[0], k -> new PriorityQueue<>())
                 .add(ticket[1]);
        }
        
        dfs("ICN");
        Collections.reverse(places);
        
        return places.toArray(new String[0]);
    }
    
    private void dfs(String des) {
        PriorityQueue<String> pq = graph.get(des);

        while (pq != null && !pq.isEmpty()) {
            String next = pq.poll();
            dfs(next);
        }

        places.add(des);
    }
}
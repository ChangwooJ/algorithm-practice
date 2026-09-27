class Solution {
    private static int count = 0;
    
    public int solution(int k, int[][] dungeons) {
        int answer = -1;
        boolean[] visited = new boolean[dungeons.length];
        
        dfs(k, dungeons, visited, 0);
        
        return count;
    }
    
    private static void dfs(int k, int[][] dungeons, boolean[] visited, int c) {
        if (c > count) count = c;
        
        for (int i = 0; i < dungeons.length; i++) {
            if (visited[i]) continue;
            if (k < dungeons[i][0]) continue;
            
            k -= dungeons[i][1];
            c++;
            visited[i] = true;
            
            dfs(k, dungeons, visited, c);
            
            c--;
            visited[i] = false;
            k += dungeons[i][1];
        }
    }
}
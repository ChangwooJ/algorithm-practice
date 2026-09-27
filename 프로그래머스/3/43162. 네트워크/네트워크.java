import java.util.*;

class Solution {
    private static int[] parents;
    
    public int solution(int n, int[][] computers) {
        int answer = 0;
        
        parents = new int[n];
        
        for (int i = 0; i < n; i++) {
            parents[i] = i;
        }
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (computers[i][j] == 1) {
                    union(i, j);
                }
            }
        }
        
        for (int i = 0; i < n; i++) {
            if (find(i) == i) {
                answer++;
            }
        }
        
        return answer;
    }
    
    private static int find(int x) {
        if (parents[x] == x) {
            return x;
        }
        
        return parents[x] = find(parents[x]);
    }
    
    private static void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        
        if (rootA != rootB) {
            parents[rootB] = rootA;
        }
    }
}
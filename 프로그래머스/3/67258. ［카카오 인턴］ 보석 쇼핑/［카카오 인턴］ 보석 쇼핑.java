import java.util.*;

class Solution {
    public int[] solution(String[] gems) {
        Set<String> gemSet = new HashSet(Arrays.asList(gems));
        int total = gemSet.size();
        int head = 0, tail = 0;
        int ahead = 0, atail = Integer.MAX_VALUE;
        
        Map<String, Integer> gemList = new HashMap<>();
        
        for(int i = 0; i < gems.length; i++) {
            gemList.put(gems[i], gemList.getOrDefault(gems[i], 0) + 1);
            if(gemList.size() >= total) {
                tail = i;
                int idx = head;
                for(int j = idx; j < tail; j++) {
                    String key = gems[j];
                    if(gemList.get(key) == 1) {
                        head = j;
                        break;
                    }
                    gemList.put(key, gemList.get(key) - 1);
                }
                
                if (tail - head < atail - ahead) {
                    atail = tail;
                    ahead = head;
                }
            }
        }
        
        
        return new int[]{ahead + 1, atail + 1};
    }
}
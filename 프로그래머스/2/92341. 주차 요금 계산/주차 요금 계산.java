import java.util.*;

class Solution {
    public int[] solution(int[] fees, String[] records) {
        Map<String, Integer> carIn = new HashMap<>();
        Map<String, Integer> carUsed = new TreeMap<>();
        
        for(int i = 0; i < records.length; i++) {
            String[] r = records[i].split(" ");
            if (carIn.containsKey(r[1])) {
                int used = cal2(r[0]) - carIn.get(r[1]);
                carUsed.put(r[1], carUsed.getOrDefault(r[1], 0) + used);
                carIn.remove(r[1]);
            } else {
                carIn.put(r[1], cal2(r[0]));
            }
        }
        
        for (String key : carIn.keySet()) {
            int left = cal2("23:59") - carIn.get(key);
            carUsed.put(key, carUsed.getOrDefault(key, 0) + left);
        }
        
        int[] answer = new int[carUsed.size()];
        int index = 0;  
        
        for(int v : carUsed.values()) {
            answer[index++] = cal(v, fees);
        }
        
        return answer;
    }
    
    private static int cal(int time, int[] fees) {
        if (time < fees[0]) {
            return fees[1];
        }
        
        int overFee = (int) Math.ceil((double) (time - fees[0]) / fees[2]) * fees[3];
        
        return fees[1] + overFee;
    }
    
    private static int cal2(String time) {
        String[] t = time.split(":");
        
        int result = Integer.parseInt(t[0]) * 60 + Integer.parseInt(t[1]);
        
        return result;
    }
}
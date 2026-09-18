import java.util.*;

class Solution {
    static boolean[] root;
    static Map<String, Integer> p;
    static int[] t;
    
    public int[] solution(String[] enroll, String[] referral, String[] seller, int[] amount) {
        int n = enroll.length;
        int[] answer = new int[n];
        
        Arrays.fill(answer, 0);
        
        p = new HashMap<>();
        root = new boolean[n];
        
        for (int i = 0; i < n; i++) {
            p.put(enroll[i], i);
        }
        
        t = new int[n];
        for (int i = 0; i < n; i++) {
            if (referral[i].equals("-")) {
                root[p.get(enroll[i])] = true;
                t[p.get(enroll[i])] = -1;
            } else {
                t[p.get(enroll[i])] = p.get(referral[i]);
            }
        }
        
        for (int i = 0; i < seller.length; i++) {
            int pn = p.get(seller[i]);
            
            cal(pn, amount[i] * 100, answer);
        }
        
        return answer;
    }
    
    private static void cal(int pn, int price, int[] answer) {
        if (pn == -1 || price == 0) {
            return;
        }

        int commission = price / 10;

        answer[pn] += price - commission;

        if (!root[pn]) {
            cal(t[pn], commission, answer);
        }
    }
}
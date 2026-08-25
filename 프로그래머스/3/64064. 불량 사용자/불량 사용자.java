import java.util.*;

class Solution {
    static List<List<String>> candidate = new ArrayList<>();
    static Set<Set<String>> answer = new HashSet<>();
    
    public int solution(String[] user_id, String[] banned_id) {
        for (String b : banned_id) {
            List<String> m = new ArrayList<>();
            for (String u : user_id) {
                if(isMatch(u, b)) {
                    m.add(u);
                }
            }
            candidate.add(m);
        }
        
        back(0, new HashSet<>());
        
        return answer.size();
    }
    
    private boolean isMatch(String user, String ban) {
        if(user.length() != ban.length()) return false;
        for(int i = 0; i < ban.length(); i++) {
            char u = user.charAt(i);
            char b = ban.charAt(i);
            if (u != b && b != '*') return false;
        }
        return true;
    }
    
    private void back(int idx, Set<String> used) {
        if(idx == candidate.size()) {
            answer.add(new HashSet<>(used));
            return;
        }
        for(String c : candidate.get(idx)) {
            if(!used.contains(c)) {
                used.add(c);
                back(idx + 1, used);
                used.remove(c);
            }
        }
    }
}
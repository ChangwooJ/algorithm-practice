class Solution {
    public long solution(int[] sequence) {
        long answer = 0;
        
        long sum1 = 0;
        long sum2 = 0;
        
        for (int i = 0; i < sequence.length; i++) {
            long s = sequence[i];
            long node1, node2;
            
            if (i % 2 == 0) {
                node1 = s;
            } else {
                node1 = -s;
            }
            
            node2 = -node1;
            
            sum1 = Math.max(node1, node1 + sum1);
            sum2 = Math.max(node2, node2 + sum2);
            
            answer = Math.max(answer, Math.max(sum1, sum2));
        }
        
        return answer;
    }
}
from collections import deque, defaultdict

def testcase(num):
    n, first = map(int, input().split())

    arr = deque(list(map(int, input().split())))
    graph = defaultdict(list)

    while arr:
        start = arr.popleft()
        end = arr.popleft()

        graph[start].append(end)

    def bfs(start):
        visited = set()
        q = deque([(start, 0)])
        visited.add(start)
        lastLevel = 0
        levelNode = []

        while q:
            node, level = q.popleft()

            if lastLevel < level:
                lastLevel = level
                levelNode = [node]
            elif level == lastLevel and node != start:
                levelNode.append(node)

            for next in graph[node]:
                if next not in visited:
                    visited.add(next)
                    q.append((next, level + 1))
        
        return max(levelNode)
        
    result = bfs(first)
    print(f"#{num + 1} {result}")

for i in range(10):
    testcase(i)
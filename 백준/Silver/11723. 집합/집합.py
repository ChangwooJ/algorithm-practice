import sys

m = int(sys.stdin.readline())
s = 0

for _ in range(m):
    line = sys.stdin.readline().split()
    
    if len(line) == 1:
        c = line[0]
        if c == "all":
            s = (1 << 21) - 1
        else:
            s = 0
    else:
        c, x = line[0], int(line[1])
        if c == "add":
            s |= (1 << x)
        elif c == "remove":
            s &= ~(1 << x)
        elif c == "check":
            print(1 if s & (1 << x) else 0)
        elif c == "toggle":
            s ^= (1 << x)
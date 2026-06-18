export const DOCUMENTATION_DATA = {
  'Bubble Sort': {
    description: 'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It is named for the way smaller elements "bubble" to the top of the list.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    useCases: [
      'Educational purposes to teach sorting basics.',
      'Extremely small datasets.',
      'Checking if an array is already sorted (runs in O(n) with an optimized version).'
    ],
    advantages: [
      'Simple to understand and implement.',
      'In-place sort (requires O(1) auxiliary space).',
      'Stable sorting algorithm (does not change the relative order of identical elements).'
    ],
    disadvantages: [
      'Extremely inefficient on large datasets with O(n²) time complexity.',
      'Performs too many swaps compared to other O(n²) algorithms like Insertion Sort.'
    ],
    pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
    related: ['Insertion Sort', 'Selection Sort', 'Merge Sort']
  },

  'Insertion Sort': {
    description: 'Insertion Sort builds a final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as Quick Sort, Heap Sort, or Merge Sort, but it offers several advantages including low overhead and adaptive capabilities.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    useCases: [
      'Sorting small arrays.',
      'Sorting arrays that are already nearly sorted (very fast, close to O(n)).',
      'Online sorting (sorting data as it is received).'
    ],
    advantages: [
      'Simple implementation.',
      'Efficient for small data sets.',
      'Adaptive: Efficient for data sets that are already substantially sorted.',
      'Stable and In-place.'
    ],
    disadvantages: [
      'Performs poorly on large arrays due to O(n²) average and worst cases.',
      'Requires substantial element shifting.'
    ],
    pseudocode: `procedure insertionSort(A : list of sortable items)
    for i := 1 to length(A) - 1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] := A[j]
            j := j - 1
        end while
        A[j + 1] := key
    end for
end procedure`,
    related: ['Bubble Sort', 'Selection Sort', 'Shell Sort']
  },

  'Selection Sort': {
    description: 'Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: a sorted sublist built up from left to right, and a remaining unsorted sublist. It repeatedly finds the smallest element from the unsorted sublist and swaps it with the leftmost unsorted element.',
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    useCases: [
      'Sorting small lists where memory writes are extremely expensive (Selection Sort minimizes swaps to at most O(n)).',
      'Teaching basic algorithm design.'
    ],
    advantages: [
      'Simple and easy to understand.',
      'In-place sorting requiring minimal additional memory.',
      'Performs the absolute minimum number of swaps (O(n) writes).'
    ],
    disadvantages: [
      'Always runs in O(n²) time, even if the array is already sorted.',
      'Not stable by default (swaps can change the relative order of equal elements).'
    ],
    pseudocode: `procedure selectionSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n - 2 do
        min_idx := i
        for j := i + 1 to n - 1 do
            if A[j] < A[min_idx] then
                min_idx := j
            end if
        end for
        if min_idx != i then
            swap(A[i], A[min_idx])
        end if
    end for
end procedure`,
    related: ['Bubble Sort', 'Insertion Sort', 'Heap Sort']
  },

  'Merge Sort': {
    description: 'Merge Sort is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort. It is a divide-and-conquer algorithm that recursively splits an array in half, sorts each half, and merges the sorted halves back together.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)'
    },
    useCases: [
      'Sorting linked lists (doesn\'t require extra random access memory).',
      'External sorting (sorting data too large to fit in RAM).',
      'Scenarios requiring guaranteed O(n log n) stable sorting.'
    ],
    advantages: [
      'Guaranteed O(n log n) worst-case performance.',
      'Stable sort, preserving original order of duplicate elements.',
      'Highly parallelizable.'
    ],
    disadvantages: [
      'Requires O(n) auxiliary memory space for arrays.',
      'Slower than Quick Sort in practice on average arrays due to copy overhead.'
    ],
    pseudocode: `procedure mergeSort(A : list of items)
    if length(A) <= 1 then
        return A
    end if
    mid := length(A) / 2
    left := mergeSort(left half of A)
    right := mergeSort(right half of A)
    return merge(left, right)
end procedure

procedure merge(L, R : lists of items)
    result := empty list
    while L is not empty and R is not empty do
        if first(L) <= first(R) then
            append first(L) to result
            remove first(L) from L
        else
            append first(R) to result
            remove first(R) from R
        end if
    end while
    append remaining items in L and R to result
    return result
end procedure`,
    related: ['Quick Sort', 'Heap Sort', 'Tim Sort']
  },

  'Quick Sort': {
    description: 'Quick Sort is an in-place sorting algorithm. Developed by British computer scientist Tony Hoare in 1959, it is still a commonly used algorithm for sorting. When implemented well, it can be about two or three times faster than its main competitors, Merge Sort and Heap Sort.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)'
    },
    useCases: [
      'General purpose sorting where average-case performance is critical.',
      'Systems programming (standard library implementations like qsort).',
      'In-memory sorting with cache locality benefits.'
    ],
    advantages: [
      'Extremely fast in practice (excellent cache locality).',
      'In-place sort requiring only logarithmic recursive stack space.',
      'Easy to adapt to other tasks (like QuickSelect for finding medians).'
    ],
    disadvantages: [
      'Worst-case performance is O(n²) (e.g. sorted arrays with bad pivot choice).',
      'Unstable sort.',
      'Sensitive to implementation choices (pivot strategy).'
    ],
    pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure

procedure partition(A, low, high)
    pivot := A[high]
    i := low - 1
    for j := low to high - 1 do
        if A[j] < pivot then
            i := i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i + 1], A[high])
    return i + 1
end procedure`,
    related: ['Merge Sort', 'Heap Sort', 'Intro Sort']
  },

  'Heap Sort': {
    description: 'Heap Sort is a comparison-based sorting algorithm. It can be thought of as an improved Selection Sort: it divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)'
    },
    useCases: [
      'Systems where heap memory is limited (strictly in-place O(1) space).',
      'Real-time systems where worst-case bounds must be strictly guaranteed.',
      'Sorting very large lists where disk operations are not needed.'
    ],
    advantages: [
      'Guaranteed O(n log n) worst-case time complexity.',
      'Requires only O(1) auxiliary space.',
      'Excellent for priority queue operations.'
    ],
    disadvantages: [
      'Unstable sort.',
      'Poorer cache performance compared to Quick Sort because of random heap access patterns.'
    ],
    pseudocode: `procedure heapSort(A : list of items)
    n := length(A)
    # Build max heap
    for i := n/2 - 1 down to 0 do
        heapify(A, n, i)
    end for
    # Extract elements
    for i := n - 1 down to 1 do
        swap(A[0], A[i])
        heapify(A, i, 0)
    end for
end procedure`,
    related: ['Selection Sort', 'Quick Sort', 'Merge Sort']
  },

  'Linear Search': {
    description: 'Linear Search is the simplest search algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)'
    },
    useCases: [
      'Searching small or unsorted lists.',
      'Simple lookups where sorting the dataset first would be overkill.',
      'Searching collections where items are added dynamically.'
    ],
    advantages: [
      'Works on any collection, sorted or unsorted.',
      'Very simple to implement and understand.',
      'No pre-processing or index creation needed.'
    ],
    disadvantages: [
      'Inefficient for large datasets due to O(n) traversal.'
    ],
    pseudocode: `procedure linearSearch(A : list, target : item)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
    related: ['Binary Search', 'Hash Table Lookup']
  },

  'Binary Search': {
    description: 'Binary Search is a search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array; if they are unequal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half.',
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)'
    },
    useCases: [
      'Searching sorted arrays/lists.',
      'Database indexes and library catalogs.',
      'Finding roots of monotonic functions (bisection method).'
    ],
    advantages: [
      'Extremely fast for large datasets (O(log n)).',
      'Requires only O(1) auxiliary space.'
    ],
    disadvantages: [
      'Requires the collection to be sorted beforehand (sorting takes O(n log n)).',
      'Requires random access support (cannot easily traverse linked lists in O(log n)).'
    ],
    pseudocode: `procedure binarySearch(A : sorted list, target : item)
    low := 0
    high := length(A) - 1
    while low <= high do
        mid := low + (high - low) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            low := mid + 1
        else
            high := mid - 1
        end if
    end while
    return -1
end procedure`,
    related: ['Linear Search', 'Jump Search', 'Interpolation Search']
  },

  'Jump Search': {
    description: 'Jump Search is a search algorithm for sorted arrays. It works by checking fewer elements by jumping ahead by fixed steps (usually √n) rather than searching all elements, and then performing a linear search in the identified block.',
    complexity: {
      best: 'O(1)',
      average: 'O(√n)',
      worst: 'O(√n)',
      space: 'O(1)'
    },
    useCases: [
      'Searching sorted arrays where binary search would require too many backward jumps.',
      'Systems where forward jumping is significantly cheaper than backward jumping (e.g. tape drives, stream processing).'
    ],
    advantages: [
      'Fewer jumps/steps than linear search.',
      'Only jumps forward (mostly), which can be highly optimized on certain hardware.'
    ],
    disadvantages: [
      'Slower than binary search (O(√n) vs O(log n)).',
      'Requires the array to be sorted.'
    ],
    pseudocode: `procedure jumpSearch(A : sorted list, target : item)
    n := length(A)
    step := floor(sqrt(n))
    prev := 0
    while A[min(step, n) - 1] < target do
        prev := step
        step := step + floor(sqrt(n))
        if prev >= n then
            return -1
        end if
    end while
    while A[prev] < target do
        prev := prev + 1
        if prev == min(step, n) then
            return -1
        end if
    end while
    if A[prev] == target then
        return prev
    end if
    return -1
end procedure`,
    related: ['Linear Search', 'Binary Search']
  },

  "Dijkstra's": {
    description: "Dijkstra's Algorithm finds the shortest path between nodes in a graph. For a given source node in the graph, the algorithm finds the shortest path between that node and all other nodes. It can also be used for finding the shortest paths from a single node to a single destination node.",
    complexity: {
      best: 'O(E log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'Network routing protocols (OSPF).',
      'GPS and mapping applications.',
      'Finding path of minimal cost in travel/finance.'
    ],
    advantages: [
      'Guarantees finding the absolute shortest path in a weighted graph.',
      'Highly optimized when using Min-Heap or Fibonacci Heap.'
    ],
    disadvantages: [
      'Cannot handle negative edge weights (can lead to infinite loops or wrong results).',
      'Explores in all directions blindly (uninformed search, slower than A* pathfinding).'
    ],
    pseudocode: `procedure dijkstra(Graph, source)
    for each vertex v in Graph:
        dist[v] := infinity
        prev[v] := undefined
    end for
    dist[source] := 0
    Q := all vertices in Graph
    while Q is not empty:
        u := vertex in Q with min dist[u]
        remove u from Q
        for each neighbor v of u:
            alt := dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] := alt
                prev[v] := u
            end if
        end for
    end while
    return dist, prev
end procedure`,
    related: ['BFS', 'Bellman-Ford', 'A* Pathfinding']
  },

  'BFS': {
    description: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph) and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Finding the shortest path in an unweighted graph.',
      'Web crawlers building indexes.',
      'Social networks finding connections at "k" distance.'
    ],
    advantages: [
      'Guaranteed to find the shortest path between two nodes in an unweighted graph.',
      'Simple queue-based iterative implementation.'
    ],
    disadvantages: [
      'Requires substantial memory to store the queue of nodes at the current level (worst-case is O(V)).',
      'Slower than DFS for deep, narrow structures.'
    ],
    pseudocode: `procedure BFS(G, start_node)
    let Q be a queue
    label start_node as discovered
    Q.enqueue(start_node)
    while Q is not empty:
        v := Q.dequeue()
        for all edges from v to w in G.adjacentEdges(v) do
            if w is not labeled as discovered:
                label w as discovered
                Q.enqueue(w)
            end if
        end for
    end while
end procedure`,
    related: ['DFS', "Dijkstra's", 'A* Pathfinding']
  },

  'DFS': {
    description: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Finding cycles in a graph.',
      'Topological sorting of nodes.',
      'Solving puzzles (like mazes) with a single solution.'
    ],
    advantages: [
      'Requires less memory than BFS for wide graphs.',
      'Easy recursive implementation.',
      'Helps in finding connected components and strongly connected components.'
    ],
    disadvantages: [
      'Does not guarantee finding the shortest path.',
      'Can get trapped in infinite paths if the graph is infinite or cyclic (requires cycle checking).'
    ],
    pseudocode: `procedure DFS(G, v)
    label v as discovered
    for all directed edges from v to w in G.adjacentEdges(v) do
        if w is not labeled as discovered then
            recursively call DFS(G, w)
        end if
    end for
end procedure`,
    related: ['BFS', 'Dijkstra\'s', 'Bellman-Ford']
  },

  "Prim's MST": {
    description: "Prim's Algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.",
    complexity: {
      best: 'O(E log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'Network design (laying telephone, electricity, or gas lines).',
      'Clustering and machine learning algorithms.'
    ],
    advantages: [
      'Guarantees optimal Minimum Spanning Tree.',
      'Performs well on dense graphs.'
    ],
    disadvantages: [
      'Requires priority queue operations, which can have overhead.',
      'Does not work on directed graphs natively.'
    ],
    pseudocode: `procedure PrimMST(G)
    for each vertex u in G:
        key[u] := infinity
        parent[u] := NIL
    end for
    key[start_node] := 0
    Q := MinPriorityQueue of G vertices using key
    while Q is not empty:
        u := Q.extractMin()
        for each neighbor v of u:
            if v in Q and weight(u, v) < key[v] then
                parent[v] := u
                key[v] := weight(u, v)
                Q.decreaseKey(v, key[v])
            end if
        end for
    end while
end procedure`,
    related: ["Dijkstra's", 'Kruskal\'s MST']
  },

  'Bellman-Ford': {
    description: 'The Bellman-Ford algorithm computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. It is slower than Dijkstra\'s algorithm for the same problem, but more versatile, as it is capable of handling graphs in which some of the edge weights are negative numbers.',
    complexity: {
      best: 'O(E)',
      average: 'O(VE)',
      worst: 'O(VE)',
      space: 'O(V)'
    },
    useCases: [
      'Graphs with negative edge weights.',
      'Detecting negative cycles.',
      'Distance-vector routing protocols (like RIP).'
    ],
    advantages: [
      'Handles negative weights correctly.',
      'Detects and reports negative weight cycles.'
    ],
    disadvantages: [
      'Significantly slower than Dijkstra\'s (O(VE) vs O(E log V)).'
    ],
    pseudocode: `procedure BellmanFord(list vertices, list edges, vertex source)
    distance := array of size |vertices|
    for each vertex v in vertices:
        distance[v] := infinity
    end for
    distance[source] := 0

    for i from 1 to |vertices|-1:
        for each edge (u, v) with weight w in edges:
            if distance[u] + w < distance[v]:
                distance[v] := distance[u] + w
            end if
        end for
    end for

    for each edge (u, v) with weight w in edges:
        if distance[u] + w < distance[v]:
            error "Graph contains a negative-weight cycle"
        end if
    end for
    return distance
end procedure`,
    related: ["Dijkstra's", 'Floyd-Warshall']
  },

  'A* Pathfinding': {
    description: 'A* is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. A* uses a heuristic function to estimate the cost from a node to the destination, speeding up path calculation.',
    complexity: {
      best: 'O(E log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'Game AI navigation.',
      'Robot pathplanning and motion control.',
      'GPS navigation routing.'
    ],
    advantages: [
      'Incredibly fast when paired with a good heuristic.',
      'Guaranteed to find the shortest path (if heuristic is admissible).'
    ],
    disadvantages: [
      'Requires substantial memory to hold the search nodes (open/closed sets).',
      'Performance relies heavily on the choice of the heuristic function.'
    ],
    pseudocode: `procedure A_Star(start, goal)
    openSet := {start}
    cameFrom := empty map
    gScore[start] := 0
    fScore[start] := heuristic_cost_estimate(start, goal)
    while openSet is not empty:
        current := node in openSet with lowest fScore[] value
        if current = goal then
            return reconstruct_path(cameFrom, current)
        end if
        openSet.remove(current)
        for each neighbor of current:
            tentative_gScore := gScore[current] + dist_between(current, neighbor)
            if tentative_gScore < gScore[neighbor] then
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)
                if neighbor not in openSet then
                    openSet.add(neighbor)
                end if
            end if
        end while
    return failure
end procedure`,
    related: ["Dijkstra's", 'BFS', 'Greedy Best-First Search']
  },

  'Binary Tree': {
    description: 'A Binary Search Tree (BST) is a node-based binary tree data structure where each node has a key and at most two children. For any node, all keys in its left subtree are smaller than its key, and all keys in its right subtree are larger than its key.',
    complexity: {
      best: 'O(log n) lookup/insert',
      average: 'O(log n) lookup/insert',
      worst: 'O(n) (skewed tree)',
      space: 'O(n)'
    },
    useCases: [
      'Implementing associative maps/dictionaries (e.g. tree maps).',
      'Database indexing (though B-Trees are preferred for disks).',
      'Sorting and hierarchical data representation.'
    ],
    advantages: [
      'Dynamic size.',
      'Maintains sorted order of elements automatically.',
      'Efficient search, insert, and delete on average.'
    ],
    disadvantages: [
      'Can become unbalanced (linear height) in the worst case, degrading operations to O(n).',
      'Extra memory for left/right pointers.'
    ],
    pseudocode: `procedure insert(node, value)
    if node is NIL then
        return Node(value)
    end if
    if value < node.value then
        node.left := insert(node.left, value)
    else
        node.right := insert(node.right, value)
    end if
    return node
end procedure`,
    related: ['Linked List', 'Hash Table', 'AVL Tree']
  },

  'Linked List': {
    description: 'A Linked List is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next, forming a chain of nodes. This allows for efficient insertions and deletions.',
    complexity: {
      best: 'O(1) insert/delete at head',
      average: 'O(n) search/access',
      worst: 'O(n) search/access',
      space: 'O(n)'
    },
    useCases: [
      'Implementing stacks and queues.',
      'Dynamic memory allocation systems.',
      'Handling hash collisions (chaining method).'
    ],
    advantages: [
      'Dynamic size (doesn\'t require pre-allocation).',
      'Insertion/deletion is O(1) once node reference is obtained.',
      'No wasted memory slots (unlike arrays).'
    ],
    disadvantages: [
      'No random access (must traverse from head to find item).',
      'Overhead of storing node pointers.'
    ],
    pseudocode: `procedure append(list, value)
    newNode := Node(value)
    if list.head is NIL then
        list.head := newNode
        return
    end if
    current := list.head
    while current.next is not NIL:
        current := current.next
    end while
    current.next := newNode
end procedure`,
    related: ['Binary Tree', 'Stack', 'Queue']
  },

  'Hash Table': {
    description: 'A Hash Table (Hash Map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.',
    complexity: {
      best: 'O(1) search/insert',
      average: 'O(1) search/insert',
      worst: 'O(n) (due to collisions)',
      space: 'O(n)'
    },
    useCases: [
      'Database indexing.',
      'Caching layers (redis, memcached).',
      'Associative arrays and symbol tables in compilers.'
    ],
    advantages: [
      'Near-instantaneous O(1) lookups, insertions, and deletions on average.',
      'Keys can be of any hashable type (strings, objects, numbers).'
    ],
    disadvantages: [
      'Hash collisions can degrade performance to O(n).',
      'Not sorted (cannot easily find minimum, maximum, or traverse in order).',
      'Requires tuning of hash function and load factor.'
    ],
    pseudocode: `procedure set(table, key, value)
    hashIndex := hashFunction(key) % table.size
    bucket := table.slots[hashIndex]
    for each pair(k, v) in bucket:
        if k == key then
            pair.v := value
            return
        end if
    end for
    append (key, value) to bucket
end procedure`,
    related: ['Binary Tree', 'Linked List']
  },

  'Stack': {
    description: 'A Stack is an abstract data type that serves as a collection of elements, with two principal operations: push, which adds an element, and pop, which removes the most recently added element. It follows the LIFO (Last In, First Out) principle.',
    complexity: {
      best: 'O(1) push/pop/peek',
      average: 'O(1) push/pop/peek',
      worst: 'O(1) push/pop/peek',
      space: 'O(n)'
    },
    useCases: [
      'Function call stack management in operating systems.',
      'Undo/Redo history tracking.',
      'Expression evaluation and syntax parsing (compilers).',
      'Backtracking in depth-first search.'
    ],
    advantages: [
      'Fast O(1) insertions and deletions.',
      'Simple, focused, and predictable API.'
    ],
    disadvantages: [
      'No random access (cannot access middle elements without popping).'
    ],
    pseudocode: `procedure push(stack, value)
    stack.items[stack.top] := value
    stack.top := stack.top + 1
end procedure

procedure pop(stack)
    if stack.top == 0 then
        return "Underflow"
    end if
    stack.top := stack.top - 1
    return stack.items[stack.top]
end procedure`,
    related: ['Queue', 'Linked List']
  },

  'Queue': {
    description: 'A Queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end and the removal of entities from the other end. It follows the FIFO (First In, First Out) principle.',
    complexity: {
      best: 'O(1) enqueue/dequeue',
      average: 'O(1) enqueue/dequeue',
      worst: 'O(1) enqueue/dequeue',
      space: 'O(n)'
    },
    useCases: [
      'Task and thread scheduling in CPUs.',
      'Message queues in distributed systems.',
      'Breadth-first search traversal queue.',
      'Handling requests in asynchronous servers.'
    ],
    advantages: [
      'Strict first-come, first-served semantics.',
      'Fast O(1) enqueue and dequeue operations.'
    ],
    disadvantages: [
      'No random access (cannot inspect or remove middle items without dequeuing).'
    ],
    pseudocode: `procedure enqueue(queue, value)
    queue.items[queue.tail] := value
    queue.tail := queue.tail + 1
end procedure

procedure dequeue(queue)
    if queue.head == queue.tail then
        return "Underflow"
    end if
    item := queue.items[queue.head]
    queue.head := queue.head + 1
    return item
end procedure`,
    related: ['Stack', 'Linked List']
  },

  'Fibonacci DP': {
    description: 'Dynamic Programming Fibonacci shows how to optimize the exponential recursive Fibonacci calculation using memoization or tabulation. By storing the results of smaller subproblems, we reduce the time complexity from O(2^n) to a linear O(n).',
    complexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(n) (or O(1) optimized)'
    },
    useCases: [
      'Introductory example of dynamic programming.',
      'Modeling populations and biological patterns.'
    ],
    advantages: [
      'Dramatic reduction in runtime (exponential to linear).',
      'Simple transition from recursion to dynamic programming.'
    ],
    disadvantages: [
      'Requires auxiliary space for storage table (can be optimized to O(1) space).'
    ],
    pseudocode: `procedure fibDP(n)
    fib := array of size n + 1
    fib[0] := 0
    fib[1] := 1
    for i from 2 to n:
        fib[i] := fib[i-1] + fib[i-2]
    end for
    return fib[n]
end procedure`,
    related: ['0/1 Knapsack', 'Coin Change']
  },

  '0/1 Knapsack': {
    description: 'The 0/1 Knapsack problem is a classic optimization problem. Given weights and values of items, we must put these items in a knapsack of a given capacity to get the maximum total value. "0/1" means we cannot break items; we either take an item fully or leave it.',
    complexity: {
      best: 'O(nW)',
      average: 'O(nW)',
      worst: 'O(nW)',
      space: 'O(nW)'
    },
    useCases: [
      'Resource allocation with budget constraints.',
      'Selecting portfolios in investment.',
      'Optimizing storage loading.'
    ],
    advantages: [
      'Guarantees the global optimal solution (unlike greedy heuristics).',
      'Handles discrete decision-making variables.'
    ],
    disadvantages: [
      'Pseudo-polynomial time complexity O(nW) where W is capacity (can be slow if W is huge).'
    ],
    pseudocode: `procedure knapsack(weights, values, capacity)
    n := length(weights)
    dp := 2D array of size (n+1) x (capacity+1) filled with 0
    for i from 1 to n:
        for w from 0 to capacity:
            if weights[i-1] <= w then
                dp[i][w] := max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w])
            else
                dp[i][w] := dp[i-1][w]
            end if
        end for
    end for
    return dp[n][capacity]
end procedure`,
    related: ['Fibonacci DP', 'Coin Change', 'Fractional Knapsack']
  },

  'Coin Change': {
    description: 'The Coin Change problem is to find the minimum number of coins needed to make a change amount. It is solved efficiently using tabulation by filling a 1D DP table representing the minimum coins needed for each amount up to the target.',
    complexity: {
      best: 'O(A * C)',
      average: 'O(A * C)',
      worst: 'O(A * C)',
      space: 'O(A)'
    },
    useCases: [
      'Transaction systems dispensing change.',
      'Optimal resource slicing.'
    ],
    advantages: [
      'Guarantees optimal coin count even when greedy strategy fails (e.g. with coins [1, 3, 4] for amount 6).',
      'Space-efficient 1D dynamic programming solution.'
    ],
    disadvantages: [
      'Can be slower if amount (A) is extremely large.'
    ],
    pseudocode: `procedure coinChange(coins, amount)
    dp := array of size amount + 1 filled with infinity
    dp[0] := 0
    for i from 1 to amount:
        for each coin in coins:
            if i - coin >= 0 then
                dp[i] := min(dp[i], dp[i - coin] + 1)
            end if
        end for
    end for
    return dp[amount]
end procedure`,
    related: ['Fibonacci DP', '0/1 Knapsack']
  }
};

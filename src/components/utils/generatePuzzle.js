export default function generatePuzzle(N) {
  const board = Array(N).fill().map(() => Array(N).fill(0));
  const queens = [];

  function isSafe(r, c) {
    for (const [qr, qc] of queens) {
      if (qr === r || qc === c) return false;
      if (Math.abs(qr - r) === Math.abs(qc - c)) return false;
      if (Math.abs(qr - r) <= 1 && Math.abs(qc - c) <= 1) return false; // no touching neighbors
    }
    return true;
  }

  function backtrack(row = 0) {
    if (row === N) return true;

    for (let col = 0; col < N; col++) {
      if (isSafe(row, col)) {
        queens.push([row, col]);
        if (backtrack(row + 1)) return true;
        queens.pop();
      }
    }
    return false;
  }

  if (!backtrack()) {
    console.error("Could not solve N-Queens for N =", N);
    return Array(N).fill().map(() => Array(N).fill("lightblue"));
  }

  // Place queen IDs
  queens.forEach((q, i) => {
    const [r, c] = q;
    board[r][c] = i + 1; // region id
  });

  // ----------------------------------------------------------
  // 2. Randomized BFS: Grow each queen region outward
  // ----------------------------------------------------------
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];
  const queue = [];

  // Initialize BFS queue with queen ID seeds
  queens.forEach(([r, c], id) => {
    queue.push({ r, c, id: id + 1 });
  });

  // BFS expansion
  while (queue.length > 0) {
    // Pick a random cell from queue to make irregular shapes
    const idx = Math.floor(Math.random() * queue.length);
    const { r, c, id } = queue.splice(idx, 1)[0];

    for (const [dr, dc] of directions) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
      if (board[nr][nc] !== 0) continue; // already assigned
      board[nr][nc] = id;
      queue.push({ r: nr, c: nc, id });
    }
  }

  // ----------------------------------------------------------
  // 3. Modern Design System Colors
  // ----------------------------------------------------------
  const cssColors = [
    "#8b5cf6", // Purple 500
    "#06b6d4", // Cyan 500
    "#10b981", // Emerald 500
    "#f59e0b", // Amber 500
    "#ef4444", // Red 500
    "#3b82f6", // Blue 500
    "#ec4899", // Pink 500
    "#14b8a6", // Teal 500
    "#f97316", // Orange 500
    "#6366f1", // Indigo 500
    "#84cc16", // Lime 500
    "#22d3ee", // Sky 500
    "#a855f7", // Purple 400
    "#fb7185", // Rose 400
    "#34d399", // Emerald 400
    "#60a5fa", // Blue 400
    "#fbbf24", // Amber 400
    "#818cf8", // Indigo 400
    "#2dd4bf", // Teal 400
    "#f472b6"  // Pink 400
  ];

  function idToColor(id) {
    return cssColors[(id - 1) % cssColors.length];
  }

  const colorGrid = board.map(row => row.map(idToColor));

  return colorGrid;
}


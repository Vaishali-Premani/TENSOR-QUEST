const nodes = [
    { id: 'arrays', label: 'Arrays & Hashing', level: 0, position: 50 },
    { id: 'two-pointers', label: 'Two Pointers', level: 1, position: 35 },
    { id: 'stack', label: 'Stack', level: 1, position: 65 },
    { id: 'binary-search', label: 'Binary Search', level: 2, position: 25 },
    { id: 'sliding-window', label: 'Sliding Window', level: 2, position: 50 },
    { id: 'linked-list', label: 'Linked List', level: 2, position: 75 },
    { id: 'trees', label: 'Trees', level: 3, position: 50 },
    { id: 'tries', label: 'Tries', level: 4, position: 25 },
    { id: 'heap', label: 'Heap / Priority Queue', level: 4, position: 50 },
    { id: 'backtracking', label: 'Backtracking', level: 4, position: 75 },
    { id: 'intervals', label: 'Intervals', level: 5, position: 20 },
    { id: 'greedy', label: 'Greedy', level: 5, position: 35 },
    { id: 'advanced-graphs', label: 'Advanced Graphs', level: 5, position: 50 },
    { id: 'graphs', label: 'Graphs', level: 5, position: 65 },
    { id: '1d-dp', label: '1-D DP', level: 5, position: 80 },
    { id: '2d-dp', label: '2-D DP', level: 6, position: 65 },
    { id: 'bit-manipulation', label: 'Bit Manipulation', level: 6, position: 80 },
    { id: 'math', label: 'Math & Geometry', level: 7, position: 72 }
];

const edges = [
    { from: 'arrays', to: 'two-pointers' },
    { from: 'arrays', to: 'stack' },
    { from: 'two-pointers', to: 'binary-search' },
    { from: 'two-pointers', to: 'sliding-window' },
    { from: 'two-pointers', to: 'linked-list' },
    { from: 'binary-search', to: 'trees' },
    { from: 'sliding-window', to: 'trees' },
    { from: 'linked-list', to: 'trees' },
    { from: 'trees', to: 'tries' },
    { from: 'trees', to: 'heap' },
    { from: 'trees', to: 'backtracking' },
    { from: 'heap', to: 'intervals' },
    { from: 'heap', to: 'greedy' },
    { from: 'backtracking', to: 'graphs' },
    { from: 'backtracking', to: '1d-dp' },
    { from: 'graphs', to: 'advanced-graphs' },
    { from: 'graphs', to: '2d-dp' },
    { from: '1d-dp', to: 'bit-manipulation' },
    { from: '2d-dp', to: 'math' },
    { from: 'bit-manipulation', to: 'math' }
];

let selectedNode = null;
const canvas = document.getElementById('connections');
const ctx = canvas.getContext('2d');
const nodesContainer = document.getElementById('nodes');
const detailsPanel = document.getElementById('detailsPanel');

function createNodes() {
    nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.id = node.id;
        nodeElement.textContent = node.label;
        nodeElement.style.left = `${node.position}%`;
        nodeElement.style.top = `${(node.level * 12) + 5}%`;
        
        nodeElement.addEventListener('click', () => selectNode(node));
        nodesContainer.appendChild(nodeElement);
    });
}

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawConnections();
}

function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    edges.forEach(edge => {
        const fromNode = document.getElementById(edge.from);
        const toNode = document.getElementById(edge.to);
        
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const containerRect = canvas.getBoundingClientRect();
        
        const startX = fromRect.left + fromRect.width / 2 - containerRect.left;
        const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
        const endX = toRect.left + toRect.width / 2 - containerRect.left;
        const endY = toRect.top + toRect.height / 2 - containerRect.top;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = (selectedNode && (edge.from === selectedNode.id || edge.to === selectedNode.id)) 
            ? '#93c5fd' 
            : '#4b5563';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function getConnectedNodes(nodeId) {
    const prerequisites = edges
        .filter(edge => edge.to === nodeId)
        .map(edge => nodes.find(n => n.id === edge.from));
    
    const nextTopics = edges
        .filter(edge => edge.from === nodeId)
        .map(edge => nodes.find(n => n.id === edge.to));
    
    return { prerequisites, nextTopics };
}

function selectNode(node) {
    if (selectedNode?.id === node.id) {
        selectedNode = null;
        detailsPanel.style.display = 'none';
    } else {
        selectedNode = node;
        document.querySelectorAll('.node').forEach(n => n.classList.remove('selected'));
        document.getElementById(node.id).classList.add('selected');
        
        const { prerequisites, nextTopics } = getConnectedNodes(node.id);
        
        document.getElementById('selectedNodeTitle').textContent = node.label;
        document.getElementById('prerequisites').innerHTML = prerequisites
            .map(n => `<span class="tag">${n.label}</span>`)
            .join('');
        document.getElementById('nextTopics').innerHTML = nextTopics
            .map(n => `<span class="tag">${n.label}</span>`)
            .join('');
        
        detailsPanel.style.display = 'block';
    }
    drawConnections();
}

// Initialize
createNodes();
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
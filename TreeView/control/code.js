let treeData = {};

WebCC.start(
    function (result) {
        if (result) {
            if (WebCC.isDesignMode) {
                console.log('Running in design mode');
                treeData = {
                    label: "Root",
                    children: [
                        {
                            label: "Parent 1",
                            children: [
                                { label: "Child 1.1", value: "123" },
                                { label: "Child 1.2", value: "456" }
                            ]
                        }
                    ]
                };
                renderTree();
            } else {
                console.log('Connected successfully in runtime');
                setProperty({ key: "treeData", value: WebCC.Properties.treeData });
                WebCC.onPropertyChanged.subscribe(setProperty);
            }
        } else {
            console.error('Connection failed');
        }
    },
    {
        methods: {},
        events: [],
        properties: {
            treeData: "{}"
        }
    },
    [],
    10000
);

function setProperty(data) {
    if (data.key === "treeData" && data.value) {
        try {
            treeData = JSON.parse(data.value);
            renderTree();
        } catch (e) {
            console.error('Invalid JSON:', e);
            console.log('Received value:', data.value);
        }
    }
}

function renderTree() {
    const container = document.getElementById('treeContainer');
    if (!container) {
        console.error('treeContainer not found');
        return;
    }
    container.innerHTML = '';
    container.appendChild(createNode(treeData));
}

function createNode(node) {
    const div = document.createElement('div');
    div.className = 'tree-node';

    const content = document.createElement('div');
    content.className = 'tree-content';
    
    const hasChildren = node.children && node.children.length > 0;
    
    // Create icon
    const icon = document.createElement('span');
    icon.className = 'tree-icon';
    icon.innerHTML = hasChildren ? '▶' : '&nbsp;';
    content.appendChild(icon);

    // Create label container
    const labelContainer = document.createElement('div');
    labelContainer.className = 'label-container';

    // Add label
    const label = document.createElement('span');
    label.className = 'node-label';
    label.textContent = node.label;
    labelContainer.appendChild(label);

    // Add value if it exists
    if (node.value) {
        const value = document.createElement('span');
        value.className = 'node-value';
        value.textContent = node.value;
        labelContainer.appendChild(value);
    }

    content.appendChild(labelContainer);

    // Add click handler for expand/collapse
    if (hasChildren) {
        content.onclick = (e) => {
            e.stopPropagation();
            const childrenDiv = div.querySelector('.tree-children');
            const isExpanded = childrenDiv.classList.contains('expanded');
            
            icon.classList.toggle('expanded');
            childrenDiv.classList.toggle('expanded');
        };
    }

    div.appendChild(content);

    // Add children if they exist
    if (hasChildren) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'tree-children';
        
        node.children.forEach(child => {
            childrenDiv.appendChild(createNode(child));
        });
        
        div.appendChild(childrenDiv);
    }

    return div;
}
import React from 'react';
const employees = [
    { command: 'A', description: 'this is a ', ui: 'this is a simple string ui' },
    { command: 'B', description: 'this is b', ui: <div style={{color: 'yellow'}}>this is a simple div ui</div> },
    { command: 'C', description: 'this is c', ui: <ul><li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
    </ul> },
    {
        command: 'D', description: 'this is d', child: [
            { command: 'D1', description: 'select D1', ui: "this is the ui of D1" },
            {
                command: 'D2', description: 'select D2', child: [
                    { command: 'D21', description: 'select D21', ui: "this is the ui of D21" },
                    { command: 'D22', description: 'select D22', ui: "this is the ui of D22" },
                    { command: 'D23', description: 'select D23', ui: "this is the ui of D23" },
                ]
            },
            { command: 'D3', description: 'select D3', ui: "this is the ui of D3" },
        ]
    }
]
export default employees;
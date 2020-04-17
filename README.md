This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm install`
install node modules

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.<br/>
If port 3000 will be in use then it will automatically shift to 3001 and so on.
There is a src->data.js file. The dynamic data structure should match the following:-

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
<br/>
There must one of either ui or child prop be avaialable in each record .<br/>
The ui can be any valid React element

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


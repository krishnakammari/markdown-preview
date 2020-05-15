import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import marked from "marked";
import * as serviceWorker from './serviceWorker';


// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.
const DEFAULT = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

// renderer funcion for markup
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
}

const Editor = props => {
  return <textarea id="editor" value={props.input} onChange={props.onChange} />;
};

const Previewer = props => {
  return <div id="preview" dangerouslySetInnerHTML={props.input}/>;
};

const Window = props => {
  return (
    <div className="window">
      <header>
        <h1>{props.heading}</h1>
      </header>
      {props.category}
    </div>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: DEFAULT,
    };
  }

  renderWindow = (heading, category) => {
    return (
      <Window
        heading={heading}
        category={category}
      />
    );
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }
  
  createMarkUp = () => {
    return {
      __html: marked(this.state.input, {
        breaks: true,
        renderer: renderer,
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderWindow(
          "Editor",
          <Editor onChange={this.handleChange} input={this.state.input} />
        )}
        {this.renderWindow(
          "Previewer", 
          <Previewer input={this.createMarkUp()} />)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




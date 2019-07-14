import React, { Component } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import articles from "./articles";

import FlipMove from "react-flip-move";
import Toggle from "./Toggle.jsx";

class ListItem extends Component {
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass} style={style}>
        <h3>{this.props.name}</h3>
        <h5>{moment(this.props.timestamp).format("MMM Do, YYYY")}</h5>
        <button onClick={this.props.clickHandler}>
          <i className="fa fa-close" />
        </button>
      </li>
    );
  }
}

class Shuffle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: "list",
      order: "asc",
      articles
    };
  }

  componentDidMount() {
    const sortAsc = (a, b) => a.weightage - b.weightage;

    this.setState({
      order: "asc",
      articles: this.state.articles.sort(sortAsc)
    });
  }

  renderArticles() {
    return this.state.articles.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          {...article}
        />
      );
    });
  }

  render() {
    return (
      <div id="shuffle" className={this.state.view}>
        <header>
          <div className="abs-right">
            <Toggle
              text={"Ascending"}
              icon={this.state.order === "asc" ? "angle-up" : "angle-down"}
              active={true}
            />
          </div>
        </header>
        <div>
          <FlipMove staggerDurationBy="30" duration={500} typeName="ul">
            {this.renderArticles()}
          </FlipMove>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Shuffle />, document.getElementById("root"));

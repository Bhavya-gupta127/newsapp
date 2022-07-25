import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "./Spinner";
// import NewsItem from '.\components\NewsItem';
import NewsItem from "./NewsItem";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    document.title = `${this.props.category}- NewsMonki`;
    // console.log(this.props.pagesize);
    // console.log("Hey! news here");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updatefun() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=923e55ffdf4e441fa007aa445aa53952&pageSize=${this.props.pagesize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let ParsedData = await data.json();
    this.setState({
      articles: ParsedData.articles,
      totalResults: ParsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updatefun();
  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatefun();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });

    this.updatefun();
  };

  fetchMoreData = async () => {
    // super(props);
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    console.log("hey");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=923e55ffdf4e441fa007aa445aa53952&pageSize=${
      this.props.pagesize
    }&page=${this.state.page + 1}`;
    this.setState({ page: this.state.page + 1 });
    // this.setState({ loading: true });
    let data = await fetch(url);
    let ParsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(ParsedData.articles),
      totalResults: ParsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div>
        <div className="container my-3 text-center">
          <h2 style={{ margin: "10px", marginTop: "70px" }}>
            NewsMonki- Top{" "}
            {this.props.category === "General" ? "" : this.props.category}{" "}
            Headline{" "}
          </h2>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.dataLength !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className=" container row my-2">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 75) : ""}
                      desc={
                        element.description
                          ? element.description.slice(0, 38)
                          : ""
                      }
                      imgUrl={
                        !element.urlToImage
                          ? "https://images.moneycontrol.com/static-mcnews/2021/12/fandosensexniftyderivative-1-770x433.jpg"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-between">
            {!this.state.loading && (
              <button
                disabled={this.state.page === 1}
                type="button"
                onClick={this.handlePrevClick}
                className="btn btn-dark"
              >
                &larr; Prev
              </button>
            )}
            {!this.state.loading && (
              <button
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResults / this.props.pagesize)
                }
                type="button"
                onClick={this.handleNextClick}
                className="btn btn-dark"
              >
                Next &rarr;{" "}
              </button>
            )}
          </div> */}
      </div>
    );
  }
}

export default News;

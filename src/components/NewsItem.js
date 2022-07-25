import React, { Component } from "react";
import "./news.css";
export class NewsItem extends Component {
  render() {
    let { title, desc, imgUrl, newsUrl, date, author, source } = this.props;
    return (
      <div>
        {/* there are 12 md in a container of bootstrap  */}
        <div className="my-3">
          <div className="card shadow-lg">
            <img src={imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{desc}...</p>
              <p className="card-text text-primary">
                {author
                  ? `${author},${source ? source : ""}`
                  : source
                  ? source
                  : ""}{" "}
                on {new Date(date).toDateString()} at{" "}
                {new Date(date).getHours()}:{new Date(date).getMinutes()}
              </p>
              <a
                href={newsUrl}
                target="_blank"
                className="btn btn-primary btm-sm"
              >
                Read more{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

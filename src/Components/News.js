import React, { Component } from 'react';
import NewsItem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 8,
        category: 'general'

    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsHub-${this.capitalize(this.props.category)}`;
    }

    async updateNews(pageNo) {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(50);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };

    render() {
        return (
            <div>
                <h1 className="text-center " style={{ margin: '35px 0px' }}>{`NewsHub - Top ${this.capitalize(this.props.category)} Headlines`}</h1>
                    
                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row my-4">
                                {this.state.articles.map((element) => {
                                    return <div key={element.url} className="col-md-4">
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imageURL={element.urlToImage ? element.urlToImage : "https://images.cnbctv18.com/wp-content/uploads/2021/09/bse-1019x573.jpg"}
                                            newsUrl={element.url} author={element.author}
                                            date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>

                    </InfiniteScroll>
                </div>
        )
    }
}
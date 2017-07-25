import React from 'react';
import request from 'request';

var Search = React.createClass({

    getInitialState: function(){
        return { 
            searchResults: [],
            topic: "",
            startDate: "",
            endDate: "",
        };
    },

    handleSubmit: function(event) {

        const apiKey = "07a3f08da25b4e3e80871ad7204fe0b5";
        const query = this.state.topic || "trump";
        const startDate = (this.state.startDate || "20170101").replace(/-/g,'');
        const endDate = (this.state.endDate || "20170725").replace(/-/g,'');
        const component = this;

        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
                'api-key': apiKey,
                'q': query,
                'begin_date': startDate,
                'end_date': endDate
            },
        }, 
        function(err, response, body) {
            body = JSON.parse(body);
            const docs = body.response.docs;
            const headlines = [];
            docs.forEach( (doc) => {
                console.log(JSON.stringify(doc.headline.main, null, 2));
                headlines.push(doc.headline.main);
            })
            component.setState({ searchResults: headlines });
        });
        event.preventDefault();
    },

    componentDidUpdate: function(prevProps, prevState) {
        const appUrl = "https://damp-citadel-98677.herokuapp.com/saved";
        request({
            url: appUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(this.state.searchResults)
        },
        function(err, response, body) {
            console.log(err);
            console.log(response);
            console.log(body);
        });
    },

    handleTopicChange: function(event) {
        this.setState({topic: event.target.value});
    },

    handleStartDateChange: function(event) {
        this.setState({startDate: event.target.value});
    },

    handleEndDateChange: function(event) {
        this.setState({endDate: event.target.value});
    },

    getHeadlines: function() {
        const listItems = this.state.searchResults.map((result) =>
            <li className="list-group-item" key={result.toString()}>
                {JSON.stringify(result, null, 2)}
            </li>
        );
        return (
            <ul className="list-group">{listItems}</ul>
        );
    },

    render: function () {
        return (

            <div className="container">
                <div className="row">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title text-center">SEARCH</h2>
                    </div>
                    <div className="panel-body">

                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group input-group-lg">
                                <h3>TOPIC</h3>
                                <input type="text" className="form-control" placeholder="Topic" id="topic"  value={this.state.topic} onChange={this.handleTopicChange}/>
                            </div>

                            <div className="input-group input-group-lg">
                                <h3>START DATE</h3>
                                <input type="date" className="form-control" placeholder="Date" id="syear" onChange={this.handleStartDateChange}/>
                            </div>

                            <div className="input-group input-group-lg">
                                <h3>END DATE</h3>
                                <input type="date" className="form-control" placeholder="Date" id="syear" onChange={this.handleEndDateChange}/>
                            </div>

                            <br />

                            <input type="submit" value="Submit" />

                            <br />

                            {this.getHeadlines()}

                        </form>

                    </div>
                </div>
                </div>
            </div>
        )
    }
});

export default Search;
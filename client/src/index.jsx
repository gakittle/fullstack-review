import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  get() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: res => {
        console.log('Server response: ', res);
        this.setState({ repos: res });
        console.log('new state: ', this.state.repos);
      },
      error: err => console.error('Error: ', err)
    });
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: { query: term },
      success: res => {
        console.log('Server response: ', res);
        this.get();
      },
      error: err => console.error('Error: ', err)
    });
  }

  componentDidMount() {
    this.get();
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <RepoList repos={this.state.repos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

/* !Date:19.03.2018 Copyright ©2018 JavaScript & React code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2018 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/Camper-Leaderboard)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

//Title
const TITLE = (
  <div class="logo">
    <a href="https://www.freecodecamp.org" target="_blank">
      <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" />
    </a>
  </div>
);

ReactDOM.render(TITLE, document.getElementById("title"));



class Leaderboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      link: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      allTime: { color: "#a5a5a5", cursor: "pointer" },
      recentDays: { color: "#099600", cursor: "pointer" },
      users: []
    };
    this.callAllTime = this.callAllTime.bind(this);
    this.callRecent = this.callRecent.bind(this);
  }

  callAllTime() {
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
      .then(res => res.json())
      .then(result => {
      this.setState({
        isLoaded: true,
        link: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
        allTime: { color: "#099600", cursor: "pointer" },
        recentDays: { color: "#a5a5a5", cursor: "pointer" },
        users: result
      });
    });
  }

  callRecent() {
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
      .then(res => res.json())
      .then(result => {
      this.setState({
        isLoaded: true,
        link: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
        allTime: { color: "#a5a5a5", cursor: "pointer" },
        recentDays: { color: "#099600", cursor: "pointer" },
        users: result
      });
    });
  }

  componentDidMount() {
    fetch(this.state.link)
      .then(res => res.json())
      .then(result => {
      this.setState({
        isLoaded: true,
        users: result
      });
    });
  }

  render() {
    const { isLoaded, link, users } = this.state;
    let fccLink = "https://www.freecodecamp.org/";
    const active = { color: "#099600", cursor: "pointer" };
    //console.log(users);
    const userStats = users.map(user => (
      <tr>
        <td id={users.indexOf(user) + 1} key={users.indexOf(user) + 1}>
          {users.indexOf(user) + 1}
        </td>
        <td id="names" key={user.username}>
          <a
            key={user.username + "link"}
            href={fccLink + user.username}
            target="_blank"
            >
            <img
              key={user.username + "avatar"}
              src={user.img}
              class="img-fluid img-head"
              />
            {user.username}
          </a>
        </td>
        <td
          id="recent"
          style={this.state.recentDays}
          key={user.username + user.recent}
          >
          {user.recent}
        </td>
        <td
          id="alltime"
          style={this.state.allTime}
          key={user.username + "alltime"}
          >
          {user.alltime}
        </td>
      </tr>
    ));

    if (!isLoaded) {
      return <div style={active}>Loading...</div>;
    } else {
      return (
        <div class="table-responsive">
          <div class="header">
            <h1>Leaderboard</h1>
          </div>
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th id="names">Camper's name</th>
                <th
                  id="30-days"
                  style={this.state.recentDays}
                  onClick={this.callRecent}
                  >
                  Past 30 days points
                </th>
                <th
                  id="all-time"
                  style={this.state.allTime}
                  onClick={this.callAllTime}
                  >
                  All time points
                </th>
              </tr>
            </thead>
            <tbody>{userStats}</tbody>
          </table>
          <div class="footer">
            <h1>Designed and coded by <a style={this.state.allTime} href="https://github.com/Madness2aMaze" target="_blank" title="©2018 Cătălin Anghel-Ursu @Madness2aMaze - All Rights Reserved">Madness2aMaze © 2018 - All Rights Reserved</a></h1>
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<Leaderboards />, document.getElementById("content"));

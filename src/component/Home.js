import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateName: '', 
            isSearch: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({stateName: event.target.value, isSearch:true
        
        })
    }

    handleSubmit(event){
        if (this.state.isSearch)
            alert ("Hello " + this.state.stateName);
        else
            alert("Enter the name")
        event.preventDefault();
    }
    async componentDidMount() {

        try{
          const string = this.state.stateName;
          console.log(string);
          const response = await fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD')
          const json = await response.json();
          this.setState({isLoaded: true, parks: json})
        } catch (error){
            console.log(error);
        }
      }

    render() {
        return (
            <React.Fragment>
                <h1>
                    Welcome!</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name of the state:
                        </label>
                        <input type="text"
                            value={this.state.stateName} onChange={this.handleChange}/>
                        <input type="submit" value="submit" />
                    </div> 
                </form>

            </React.Fragment>

        )
    }
}

export default HomePage;

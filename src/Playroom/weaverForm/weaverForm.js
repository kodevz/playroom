import React from 'react';
import './weaverForm.css';

class WeaverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retailerId: '',
      code: '',
      tempId: '',
      ln: 'en',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.state[event.target.name] = event.target.value;
    this.setState({ ...this.state });
  }

  handleSubmit(event) {
    event.preventDefault();
    let stateData = this.state
    window.open(`http://weaveroo-playroom.s3-website.ap-south-1.amazonaws.com/preview/#?publish=true&retailerId=${stateData.retailerId}&code=${stateData.code}&tempId=${stateData.tempId}&ln=${stateData.ln}`);
    this.clearForm();
  }

  clearForm() {
    this.setState({
      retailerId: '',
      code: '',
      tempId: '',
    });
  }

  render() {
    return (
      <>
        <div id="wever-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-div">
              <label>RetailerId:</label>
              <input
                type="text"
                value={this.state.retailerId}
                onChange={this.handleChange}
                name="retailerId"
                required
              />
            </div>
            <div className="form-div">
              <label>Code:</label>
              <input
                type="text"
                value={this.state.code}
                onChange={this.handleChange}
                name="code"
                required
              />
            </div>
            <div className="form-div">
              <label>TempId:</label>
              <input
                type="text"
                value={this.state.tempId}
                onChange={this.handleChange}
                name="tempId"
                required
              />
            </div>
            <div className="form-div">
              <label>Language:</label>
              <input
                type="text"
                value={this.state.ln}
                onChange={this.handleChange}
                name="ln"
                required
              />
            </div>
            <button className="submit">
              Publish
            </button>

          </form>
        </div>
      </>
    );
  }
}

export default WeaverForm;

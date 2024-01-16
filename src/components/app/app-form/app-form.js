import { Component } from 'react';
import './app-form.css';

class AppForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  onSubmitHandler = (e) => {
    const { title, description } = this.state;
    this.props.onFormSubmit(e, title, description);
    this.setState({
      title: '',
      description: '',
    });
  };

  render() {
    const { title, description } = this.state;
    return (
      <form className='app__content-form' onSubmit={this.onSubmitHandler}>
        <label htmlFor='title-input'>
          <span className='app__content-label'>Title:</span>
          <input
            className='app__content-input'
            id='title-input'
            name='title'
            type='text'
            value={title}
            onChange={this.onInputChange}
            required
            placeholder='What is the title?'
          />
        </label>
        <label htmlFor='description-input'>
          <span className='app__content-label'>Description:</span>
          <input
            className='app__content-input'
            id='description-input'
            name='description'
            type='text'
            value={description}
            onChange={this.onInputChange}
            required
            placeholder='What is the description?'
          />
        </label>
        <button type='submit' className='btn app__content-submit-button green'>
          Add
        </button>
      </form>
    );
  }
}

export default AppForm;

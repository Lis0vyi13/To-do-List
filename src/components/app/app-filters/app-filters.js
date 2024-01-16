import { Component } from 'react';
import './app-filters.css';

class AppFilters extends Component {
  onFiltersClickHandler = (e) => {
    const { onTabHandler } = this.props;

    const currentButton = e.target;
    if (currentButton.classList.contains('active')) return;
    const activeButton = document.querySelector('button.active');
    activeButton.classList.remove('active');
    currentButton.classList.add('active');

    onTabHandler(e);
  };

  render() {
    return (
      <div className='app__filters'>
        <button
          data-type='todo'
          className='btn active'
          onClick={this.onFiltersClickHandler}
        >
          To Do
        </button>
        <button
          data-type='completed'
          className='btn'
          onClick={this.onFiltersClickHandler}
        >
          Completed
        </button>
      </div>
    );
  }
}

export default AppFilters;

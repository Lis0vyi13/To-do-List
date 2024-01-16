import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppTitle from './app-title/app-title';
import AppForm from './app-form/app-form';
import AppFilters from './app-filters/app-filters';
import AppListItem from './app-list-item/app-list-item';
import AppList from './app-list/app-list';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('data')) || [],
      activeButton: 'todo',
    };
  }

  updateLocalStorage = (value) => {
    localStorage.setItem('data', JSON.stringify(value));
  };

  onFormSubmit = (e, title, description) => {
    e.preventDefault();

    const dataItem = {
      title: title,
      description: description,
      key: uuidv4(),
      isCompleted: false,
    };

    const newArr = [...this.state.data, dataItem];
    this.updateLocalStorage(newArr);
    this.setState(() => ({ data: newArr }));
  };

  onRemoveElem = (key) => {
    const { data } = this.state;
    const newArr = data.filter((item) => item.key !== key);
    this.setState(() => ({
      data: newArr,
    }));
    this.updateLocalStorage(newArr);
  };

  onAccept = (key) => {
    const { data } = this.state;

    const newArr = data.map((item) => {
      if (item.key === key) {
        item.isCompleted = !item.isCompleted;

        const timestamp = new Date();

        const datePart = timestamp.toDateString();
        const timePart = timestamp.toTimeString().split(' ')[0];

        const time = `${datePart} ${timePart}`;

        localStorage.setItem(item.key, time);
      }
      return item;
    });

    this.setState(() => ({
      data: newArr,
    }));
    this.updateLocalStorage(newArr);
  };

  onTabHandler = (e) => {
    const elem = e.target;

    this.setState({
      activeButton: elem.dataset.type,
    });
  };

  renderDataItems = () => {
    const { data, activeButton } = this.state;
    let filteredArr = [...data];
    if (activeButton === 'todo') {
      filteredArr = filteredArr.filter((item) => !item.isCompleted);
    } else {
      filteredArr = filteredArr.filter((item) => item.isCompleted);
    }
    return filteredArr.map((item) => (
      <AppListItem
        key={item.key}
        onRemove={() => this.onRemoveElem(item.key)}
        onAccept={() => this.onAccept(item.key)}
        time={localStorage.getItem(item.key)}
        {...item}
      />
    ));
  };

  render() {
    return (
      <div className='app'>
        <AppTitle />
        <div className='container'>
          <div className='app__content'>
            <AppForm onFormSubmit={this.onFormSubmit} />
            <AppFilters onTabHandler={this.onTabHandler} />
            <AppList>{this.renderDataItems()}</AppList>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

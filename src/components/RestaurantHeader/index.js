import {Component} from 'react'
import {BsFilterRight} from 'react-icons/bs'
import {MdArrowDropDown} from 'react-icons/md'

import './index.css'

class RestaurantHeader extends Component {
  state = {
    showFilter: false,
  }

  onClickShow = () => {
    this.setState(prevState => ({showFilter: !prevState.showFilter}))
  }

  onChangeSortBy = event => {
    const {changeSortBy} = this.props
    changeSortBy(event.target.value)
  }

  showFilter = () => {
    const {sortByOptions, activeOptionId} = this.props

    return (
      <>
        <div className="desktop-filter">
          <select
            size="2"
            className="sort-by-select"
            value={activeOptionId}
            onChange={this.onChangeSortBy}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }

  renderMobileFilter = () => {
    const {sortByOptions, activeOptionId} = this.props
    return (
      <div className="mobile-filter">
        <BsFilterRight size={18} />
        <p className="sort-by-title">Sort By</p>
        <select
          className="sort-by-select-mobile"
          value={activeOptionId}
          onChange={this.onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option-mobile"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  render() {
    const {activeOptionId} = this.props
    const {showFilter} = this.state
    return (
      <div className="restaurant-header">
        <div className="header-text-container">
          <h1 className="restaurant-list-heading">Popular Restaurants</h1>
          <p className="restaurant-list-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="sort-by-container">
          <button
            className="sort-by-container-button"
            type="button"
            onClick={this.onClickShow}
          >
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">
              Sort by <span className="option-id">{activeOptionId}</span>
              <span>
                <MdArrowDropDown size={30} />
              </span>
            </p>
          </button>
          {showFilter && this.showFilter()}
          {this.renderMobileFilter()}
        </div>
      </div>
    )
  }
}

export default RestaurantHeader

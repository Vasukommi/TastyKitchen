import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BiSearchAlt} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FindFood extends Component {
  state = {
    inputSearch: '',
    allRestaurants: [],
    vegList: [],
    nonVegList: [],
    searchResultList: [],
    showSearchResults: false,
    noSearchResults: false,
  }

  componentDidMount() {
    this.fetchRestaurantsDetails()
  }

  fetchRestaurantsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?&offset=0&limit=30`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.restaurants.map(restaurant => ({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        rating: restaurant.user_rating.rating,
        totalReviews: restaurant.user_rating.total_reviews,
        menuType: restaurant.menu_type,
        ratingColor: restaurant.user_rating.rating_color,
      }))

      const vegRestaurants = updatedData.filter(
        eachItem => eachItem.menuType === 'VEG',
      )
      const nonVegRestaurants = updatedData.filter(
        eachItem => eachItem.menuType === 'NON-VEG',
      )

      this.setState({
        allRestaurants: updatedData,
        vegList: vegRestaurants,
        nonVegList: nonVegRestaurants,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeInput = event => {
    this.setState({inputSearch: event.target.value, noSearchResults: false})
    if (event.target.value === '') {
      this.setState({showSearchResults: false})
    }
  }

  onSearchUserInput = () => {
    this.setState({showSearchResults: true})
    this.searchResults()
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.setState({showSearchResults: true})
      this.searchResults()
    }
  }

  searchResults = () => {
    const {inputSearch, allRestaurants} = this.state
    const filterRestaurantsBySearch = allRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(inputSearch.toLowerCase()),
    )
    if (filterRestaurantsBySearch.length === 0) {
      const filterRestaurantsByCuisine = allRestaurants.filter(restaurant =>
        restaurant.cuisine.toLowerCase().includes(inputSearch.toLowerCase()),
      )
      this.setState({searchResultList: filterRestaurantsByCuisine})
      if (filterRestaurantsByCuisine.length === 0) {
        this.setState({noSearchResults: true})
      }
    } else {
      this.setState({searchResultList: filterRestaurantsBySearch})
      if (filterRestaurantsBySearch.length === 0) {
        this.setState({noSearchResults: true})
      }
    }
  }

  closeNotFound = () => {
    this.setState({noSearchResults: false, inputSearch: ''})
  }

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1635819172/Tasty%20Kitchen/PageNotFound/Group_wbimtk.png"
        alt="restaurants failure"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading-text">Page Not Found</h1>
      <p className="restaurant-failure-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button className="error-button" type="button">
        Home Page
      </button>
    </div>
  )

  renderSearchBar = () => {
    const {inputSearch} = this.state

    return (
      <div className="input-search-container">
        <input
          onKeyDown={this.onClickEnter}
          onChange={this.onChangeInput}
          value={inputSearch}
          type="search"
          className="input-search"
          placeholder="Find Food"
        />
        <button
          onClick={this.onSearchUserInput}
          type="button"
          className="search-button"
        >
          <BiSearchAlt size={23} />
        </button>
      </div>
    )
  }

  renderVegRestaurants = () => {
    const {vegList} = this.state
    const filteredVegList = vegList.filter(eachItem => eachItem.rating > 3.5)
    const vegRestaurantsList = filteredVegList.slice(0, 6)

    return (
      <div className="veg-restaurants-section">
        <h1 className="top-rated-veg-heading">Top Rated Veg Restaurants</h1>
        <ul className="veg-restaurants-container">
          {vegRestaurantsList.map(restaurant => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderNonVegRestaurants = () => {
    const {nonVegList} = this.state
    const filteredNonVegList = nonVegList.filter(
      eachItem => eachItem.rating > 3.5,
    )
    const NonVegRestaurantsList = filteredNonVegList.slice(0, 6)

    return (
      <div className="veg-restaurants-section">
        <h1 className="top-rated-veg-heading">Top Rated Non Veg Restaurants</h1>
        <ul className="veg-restaurants-container">
          {NonVegRestaurantsList.map(restaurant => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchResults = () => {
    const {searchResultList} = this.state

    return (
      <ul className="search-result-restaurants-container">
        {searchResultList.map(restaurant => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </ul>
    )
  }

  renderNotFound = () => (
    <div className="food-not-found">
      <img
        className="no-food-image"
        alt="no food"
        src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1635819172/Tasty%20Kitchen/PageNotFound/Group_wbimtk.png"
      />
      <h1 className="no-restaurants-heading">No Restaurants Found</h1>
      <p className="no-food-para">Search With Different Keyword</p>
      <button
        onClick={this.closeNotFound}
        className="no-food-close-button"
        type="button"
      >
        Close
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {showSearchResults, noSearchResults} = this.state

    return (
      <>
        {this.renderSearchBar()}
        {noSearchResults && this.renderNotFound()}
        {showSearchResults && this.renderSearchResults()}
        {this.renderVegRestaurants()}
        {this.renderNonVegRestaurants()}
      </>
    )
  }

  renderFindRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="find-food-page">{this.renderFindRestaurants()}</div>
        <Footer />
      </>
    )
  }
}

export default FindFood

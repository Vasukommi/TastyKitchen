import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'

import ReactSlider from '../ReactSlider'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllRestaurantSection extends Component {
  state = {
    restaurantList: [],
    activeOptionId: 'Lowest',
    currentPage: 0,
    maxPages: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, currentPage} = this.state
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${
      currentPage * 9
    }&limit=9&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const maxItems = fetchedData.total
      const maxPages = (maxItems % 9) + 1
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        rating: restaurant.user_rating.rating,
        totalReviews: restaurant.user_rating.total_reviews,
        ratingColor: restaurant.user_rating.rating_color,
      }))
      this.setState({
        maxPages,
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurants)
  }

  renderRestaurantListView = () => {
    const {restaurantList, activeOptionId} = this.state

    return (
      <>
        <RestaurantHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          changeSortBy={this.changeSortBy}
        />
        <hr className="hr-line" />
        <ul className="restaurant-list">
          {restaurantList.map(restaurant => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </ul>
      </>
    )
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

  renderLoadingView = () => (
    <div
      testid="restaurants-list-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  leftArrowClicked = () => {
    const {currentPage} = this.state
    if (currentPage > 0) {
      this.setState(
        prev => ({currentPage: prev.currentPage - 1}),
        this.getRestaurants,
      )
    }
  }

  rightArrowClicked = () => {
    const {currentPage} = this.state
    if (currentPage < 3) {
      this.setState(
        prev => ({currentPage: prev.currentPage + 1}),
        this.getRestaurants,
      )
    }
  }

  render() {
    const {currentPage, maxPages} = this.state
    return (
      <div>
        <ReactSlider />
        <div className="all-restaurant-responsive-container">
          {this.renderRestaurants()}
          <div className="restaurant-navigation">
            <button
              type="button"
              className="arrow-button"
              testid="pagination-left-button"
              onClick={this.leftArrowClicked}
            >
              <AiOutlineLeftSquare size={35} style={{color: '#64748B'}} />
            </button>
            <span testid="active-page-number" className="current-page">
              {currentPage + 1} of {maxPages}
            </span>
            <button
              type="button"
              className="arrow-button"
              testid="pagination-right-button"
              onClick={this.rightArrowClicked}
            >
              <AiOutlineRightSquare size={35} style={{color: '#64748B'}} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AllRestaurantSection

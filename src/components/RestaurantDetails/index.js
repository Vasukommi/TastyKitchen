import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantFoodItem from '../RestaurantFoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    rating: data.rating,
    name: data.name,
    reviewsCount: data.reviews_count,
    location: data.location,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
  })

  getFoodItemFormattedData = data => ({
    imageUrl: data.image_url,
    name: data.name,
    cost: data.cost,
    rating: data.rating,
    id: data.id,
  })

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedFoodItemData = fetchedData.food_items.map(eachItem =>
        this.getFoodItemFormattedData(eachItem),
      )
      this.setState({
        restaurantData: updatedData,
        foodItemData: updatedFoodItemData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRestaurantDetailsView = () => {
    const {restaurantData, foodItemData} = this.state
    const {
      imageUrl,
      rating,
      name,
      location,
      reviewsCount,
      costForTwo,
      cuisine,
    } = restaurantData

    return (
      <>
        <div className="specific-restaurant-details-container">
          <div className="restaurant-banner-container">
            <div className="banner-responsive-container">
              <img
                src={imageUrl}
                alt="restaurant"
                className="specific-restaurant-image"
              />
              <div className="banner-details-container">
                <h1 className="specific-restaurant-name">{name}</h1>
                <p className="specific-restaurant-cuisine">{cuisine}</p>
                <p className="specific-restaurant-location">{location}</p>
                <div className="rating-cost-container">
                  <div className="specific-restaurant-rating-container">
                    <div className="rating-container">
                      <AiFillStar className="restaurant-details-star" />
                      <p className="specific-restaurant-rating">{rating}</p>
                    </div>
                    <p className="specific-restaurant-reviews">
                      {reviewsCount}+ Ratings
                    </p>
                  </div>
                  <hr className="line" />
                  <div className="cost-container">
                    <p className="specific-restaurant-cost">
                      <BiRupee size={15} />
                      {costForTwo}
                    </p>
                    <p className="specific-restaurant-cost-text">
                      Cost for two
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="food-item-list-container">
            {foodItemData.map(eachFoodItem => (
              <RestaurantFoodItem
                eachFoodItem={eachFoodItem}
                key={eachFoodItem.id}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://res.cloudinary.com/nsp/image/upload/v1635664104/tastyKitchens/error_1x_csgpog.png"
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

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
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
        <div className="Restaurant-details-container">
          {this.renderRestaurantDetails()}
        </div>
      </>
    )
  }
}

export default RestaurantDetails

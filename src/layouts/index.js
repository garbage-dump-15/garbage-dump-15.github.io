import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Swipeable from 'react-swipeable';
import Transition from '../components/transition';

import './index.css';

const Header = ({ name, title, date }) => (
  <header>
    <Link to="/1">
      Buy <span>SSD</span>
    </Link>
  </header>
);

class TemplateWrapper extends Component {
  NEXT = [13, 32, 39];
  PREV = 37;

  swipeLeft = () => {
    this.navigate({ keyCode: this.NEXT[0] });
  };

  swipeRight = () => {
    this.navigate({ keyCode: this.PREV });
  };

  navigate = ({ wheel }) => {
    wheel = wheel || window.event;
    const now = this.props.data.slide.index;
    const slidesLength = this.props.slidesLength;
    const down = wheel.wheelDelta < 0;

    if (now) {
      if (!down && now === 1) {
        return false;
      } else if (down && now === slidesLength) {
        return false;
      } else if (down) {
        navigate(`/${now + 1}`);
      } else if (!down) {
        navigate(`/${now - 1}`);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('mousewheel', this.navigate);
  }

  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.navigate);
  }

  render() {
    const { location, children, site } = this.props;

    return (
      <div>
        <Helmet
          title={"Buy SSD"}
        />
        <Header
          name={site.siteMetadata.name}
          title={site.siteMetadata.title}
          date={site.siteMetadata.date}
        />
        <Swipeable
          onSwipedLeft={this.swipeLeft}
          onSwipedRight={this.swipeRight}
        >
          <Transition location={location}>
            <div id="slide" style={{'width': '100%'}}>{children}</div>
          </Transition>
        </Swipeable>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            name
            title
          }
        }
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
    render={data => (
      <TemplateWrapper
        site={data.site}
        slidesLength={data.allSlide.edges.length}
        {...props}
      />
    )}
  />
);

import React from 'react'
import Image from '../image'
import Avatar from '../avatar'

const Result = (result) => (
  <div className="maha-search-result" onClick={ result.onClick }>
    { result.extra && result.extra.user &&
      <div className="maha-search-result-image">
        <Avatar user={ result.extra.user } />
      </div>
    }
    { result.extra && result.extra.photo &&
      <div className="maha-search-result-image">
        <Image src={ result.extra.photo } />
      </div>
    }
    { result.extra && result.extra.icon &&
      <div className="maha-search-result-icon">
        <i className={`fa fa-fw fa-${result.extra.icon}`} />
      </div>
    }
    { !result.extra &&
      <div className="maha-search-result-icon">
        <i className="search icon" />
      </div>
    }
    <div className="maha-search-result-details">
      { result.text }
    </div>
    <div className="maha-search-result-proceed">
      <i className="fa fa-fw fa-chevron-right" />
    </div>
  </div>

)

export default Result

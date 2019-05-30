import React from 'react'
import Image from '../image'
import Avatar from '../avatar'

const Result = (result) => (
  <div className="maha-omnisearch-result" onClick={ result.onClick }>
    { result.extra && result.extra.user &&
      <div className="maha-omnisearch-result-image">
        <Avatar user={ result.extra.user } />
      </div>
    }
    { result.extra && result.extra.photo &&
      <div className="maha-omnisearch-result-image">
        <Image src={ result.extra.photo } />
      </div>
    }
    { result.extra && result.extra.icon &&
      <div className="maha-omnisearch-result-icon">
        <i className={`fa fa-fw fa-${result.extra.icon}`} />
      </div>
    }
    { !result.extra &&
      <div className="maha-omnisearch-result-icon">
        <i className="search icon" />
      </div>
    }
    <div className="maha-omnisearch-result-details">
      { result.text }
    </div>
    <div className="maha-omnisearch-result-proceed">
      <i className="fa fa-fw fa-chevron-right" />
    </div>
  </div>

)

export default Result

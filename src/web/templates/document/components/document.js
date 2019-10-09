import PropTypes from 'prop-types'

import React from 'react'

class Document extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    children: PropTypes.any,
    onAction: PropTypes.func
  }

  render() {
    // const { config } = this.props
    return (
      <div className="document" style={ this._getStyle() }>
<h1>Header 1</h1>
<h2>Header 2</h2>
<p>Lorem ipsum dolor amet 3 wolf moon kogi retro adaptogen mlkshk chillwave leggings taiyaki hammock. Woke ethical gastropub salvia flannel. Flannel sustainable sriracha pickled, vegan offal deep v actually YOLO cray jean shorts glossier freegan. Lomo chia authentic +1. Jianbing beard bespoke crucifix, typewriter gentrify chillwave bitters taiyaki. Fixie kombucha selvage, mixtape meh hot chicken chambray poke tumeric neutra cray.</p>
<p>Sustainable tilde pug hammock neutra microdosing aesthetic bicycle rights blue bottle slow-carb lomo adaptogen crucifix. Health goth yuccie chartreuse, mixtape hell of pok pok tofu subway tile bitters affogato meh mustache readymade. Hexagon drinking vinegar kickstarter pinterest, fam air plant wayfarers cray twee post-ironic irony four dollar toast brooklyn retro lyft. Activated charcoal bespoke artisan jean shorts vice hexagon ramps echo park small batch wolf post-ironic gentrify lyft.</p>
<h2>Header 2</h2>
<p>Brunch health goth tumeric, copper mug PBR&B lyft wayfarers tofu kogi coloring book letterpress flannel prism mustache. Bicycle rights raw denim swag tattooed tbh air plant iceland skateboard celiac organic gastropub echo park drinking vinegar. Four loko sriracha photo booth blog blue bottle. Neutra lo-fi fam church-key, chillwave yuccie tacos bitters. Roof party venmo lumbersexual beard. PBR&B ugh tbh, echo park readymade synth skateboard shaman pop-up squid farm-to-table chambray lomo.</p>
<p>Godard af art party tousled, selvage la croix disrupt microdosing freegan snackwave. Austin celiac live-edge, messenger bag shaman literally PBR&B palo santo chicharrones truffaut trust fund copper mug. Paleo cardigan irony vexillologist la croix jianbing. Irony unicorn 8-bit mustache kale chips post-ironic bushwick taxidermy fixie skateboard.</p>
<h2>Header 2</h2>
<p>Messenger bag food truck copper mug hammock chicharrones polaroid meggings, selvage tumeric man bun cloud bread. Kogi hot chicken green juice ugh. Man bun forage leggings, irony yuccie heirloom street art chillwave intelligentsia vice taxidermy activated charcoal raw denim cronut. Mustache listicle fashion axe unicorn chillwave, squid lumbersexual banjo lyft bitters man bun fanny pack. Pinterest seitan ugh franzen locavore master cleanse roof party. Health goth seitan try-hard shoreditch cronut, lomo vaporware XOXO offal taxidermy jean shorts artisan. Vegan hexagon +1 butcher, gastropub echo park before they sold out waistcoat raclette distillery heirloom etsy next level.</p>
<p>Lorem ipsum dolor amet 3 wolf moon kogi retro adaptogen mlkshk chillwave leggings taiyaki hammock. Woke ethical gastropub salvia flannel. Flannel sustainable sriracha pickled, vegan offal deep v actually YOLO cray jean shorts glossier freegan. Lomo chia authentic +1. Jianbing beard bespoke crucifix, typewriter gentrify chillwave bitters taiyaki. Fixie kombucha selvage, mixtape meh hot chicken chambray poke tumeric neutra cray.</p>
<h2>Header 2</h2>
<p>Sustainable tilde pug hammock neutra microdosing aesthetic bicycle rights blue bottle slow-carb lomo adaptogen crucifix. Health goth yuccie chartreuse, mixtape hell of pok pok tofu subway tile bitters affogato meh mustache readymade. Hexagon drinking vinegar kickstarter pinterest, fam air plant wayfarers cray twee post-ironic irony four dollar toast brooklyn retro lyft. Activated charcoal bespoke artisan jean shorts vice hexagon ramps echo park small batch wolf post-ironic gentrify lyft.</p>
<p>Brunch health goth tumeric, copper mug PBR&B lyft wayfarers tofu kogi coloring book letterpress flannel prism mustache. Bicycle rights raw denim swag tattooed tbh air plant iceland skateboard celiac organic gastropub echo park drinking vinegar. Four loko sriracha photo booth blog blue bottle. Neutra lo-fi fam church-key, chillwave yuccie tacos bitters. Roof party venmo lumbersexual beard. PBR&B ugh tbh, echo park readymade synth skateboard shaman pop-up squid farm-to-table chambray lomo.</p>
<h2>Header 2</h2>
<p>Godard af art party tousled, selvage la croix disrupt microdosing freegan snackwave. Austin celiac live-edge, messenger bag shaman literally PBR&B palo santo chicharrones truffaut trust fund copper mug. Paleo cardigan irony vexillologist la croix jianbing. Irony unicorn 8-bit mustache kale chips post-ironic bushwick taxidermy fixie skateboard.</p>
<p>Messenger bag food truck copper mug hammock chicharrones polaroid meggings, selvage tumeric man bun cloud bread. Kogi hot chicken green juice ugh. Man bun forage leggings, irony yuccie heirloom street art chillwave intelligentsia vice taxidermy activated charcoal raw denim cronut. Mustache listicle fashion axe unicorn chillwave, squid lumbersexual banjo lyft bitters man bun fanny pack. Pinterest seitan ugh franzen locavore master cleanse roof party. Health goth seitan try-hard shoreditch cronut, lomo vaporware XOXO offal taxidermy jean shorts artisan. Vegan hexagon +1 butcher, gastropub echo park before they sold out waistcoat raclette distillery heirloom etsy next level.</p>
      </div>
    )
  }

  _getStyle() {
    return {
      width: 850,
      height: 1100
    }
  }

}

export default Document

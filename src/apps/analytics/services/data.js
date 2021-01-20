import _ from 'lodash'

export const getData = (req, { type, data }) => {

  if(type === 'page_ping') {
    return {
      x_min: data.pp_xoffset_min,
      x_max: data.pp_xoffset_max,
      y_min: data.pp_yoffset_min,
      y_max: data.pp_yoffset_max
    }
  }

  if(type === 'transaction_item') {
    return {
      order_id: data.ti_orderid,
      sku: data.ti_sku,
      name: data.ti_name,
      category: data.ti_category,
      price: data.ti_price,
      quantity: data.ti_quantity,
      currency: data.ti_currency
    }
  }

  if(type === 'transaction') {
    return {
      order_id: data.tr_orderid,
      affiliation: data.tr_affiliation,
      total: data.tr_total,
      shipping: data.tr_shipping,
      tax: data.tr_tax,
      city: data.tr_city,
      state: data.tr_state,
      country: data.tr_country,
      currency: data.tr_currency
    }
  }

  if(_.includes(['add_to_cart','remove_from_cart'], type)) {
    const ca = data.unstruct_event.data.data
    return {
      sku: ca.sku,
      name: ca.name,
      category: ca.category,
      price: ca.unitPrice,
      quantity: ca.quantity,
      currency: ca.currency
    }
  }

  if(type === 'ad_impression') {
    const ai = data.unstruct_event.data.data
    return {
      impression_id: ai.impressionId,
      cost_model: ai.costModel,
      cost: ai.cost,
      target_url: ai.targetUrl,
      banner_id: ai.bannerId,
      zone_id: ai.zoneId,
      advertiser_id: ai.advertiserID,
      campaign_id: ai.campaignId
    }
  }

  if(type === 'ad_click') {
    const ac = data.unstruct_event.data.data
    return {
      target_url: ac.targetUrl,
      click_id: ac.clickId,
      cost_model: ac.costModel,
      cost: ac.cost,
      banner_id: ac.bannerId,
      zone_id: ac.zoneId,
      advertiser_id: ac.advertiserID,
      campaign_id: ac.campaignId
    }
  }

  if(type === 'ad_conversion') {
    const ac = data.unstruct_event.data.data
    return {
      conversion_id: ac.conversionId,
      cost_model: ac.costModel,
      cost: ac.cost,
      category: ac.category,
      action: ac.action,
      property: ac.property,
      initial_value: ac.initialValue,
      advertiser_id: ac.advertiserID,
      campaign_id: ac.campaignId
    }
  }

  if(type === 'struct') {
    return {
      action: data.se_action,
      category: data.se_category,
      label: data.se_label,
      property: data.se_property,
      value: data.se_value
    }
  }

  if(type === 'social_interaction') {
    const si = data.unstruct_event.data.data
    return {
      action: si.action,
      network: si.network,
      target: si.target
    }
  }

  if(type === 'site_search') {
    const ss = data.unstruct_event.data.data
    return {
      terms: ss.terms,
      filters: ss.filters,
      total_results: ss.totalResults
    }
  }

  if(data.unstruct_event) {
    return data.unstruct_event.data.data
  }

}

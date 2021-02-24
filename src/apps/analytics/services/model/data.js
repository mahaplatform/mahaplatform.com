import _ from 'lodash'

export const getData = (req, { type, enriched }) => {

  if(type === 'page_ping') {
    return {
      x_min: enriched.pp_xoffset_min,
      x_max: enriched.pp_xoffset_max,
      y_min: enriched.pp_yoffset_min,
      y_max: enriched.pp_yoffset_max
    }
  }

  if(type === 'transaction_item') {
    return {
      order_id: enriched.ti_orderid,
      sku: enriched.ti_sku,
      name: enriched.ti_name,
      category: enriched.ti_category,
      price: enriched.ti_price,
      quantity: enriched.ti_quantity,
      currency: enriched.ti_currency
    }
  }

  if(type === 'transaction') {
    return {
      order_id: enriched.tr_orderid,
      affiliation: enriched.tr_affiliation,
      total: enriched.tr_total,
      shipping: enriched.tr_shipping,
      tax: enriched.tr_tax,
      city: enriched.tr_city,
      state: enriched.tr_state,
      country: enriched.tr_country,
      currency: enriched.tr_currency
    }
  }

  if(_.includes(['add_to_cart','remove_from_cart'], type)) {
    const ca = enriched.unstruct_event.data.data
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
    const ai = enriched.unstruct_event.data.data
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
    const ac = enriched.unstruct_event.data.data
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
    const ac = enriched.unstruct_event.data.data
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
      action: enriched.se_action,
      category: enriched.se_category,
      label: enriched.se_label,
      property: enriched.se_property,
      value: enriched.se_value
    }
  }

  if(type === 'social_interaction') {
    const si = enriched.unstruct_event.data.data
    return {
      action: si.action,
      network: si.network,
      target: si.target
    }
  }

  if(type === 'site_search') {
    const ss = enriched.unstruct_event.data.data
    return {
      terms: ss.terms,
      filters: ss.filters,
      total_results: ss.totalResults
    }
  }

  if(enriched.unstruct_event) {
    return enriched.unstruct_event.data.data
  }

}

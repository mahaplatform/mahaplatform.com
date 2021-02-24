const transactionEnrichment = async(req, event) => {

  return {
    ...event,
    tr_orderid: event.tr_id,
    tr_affiliation: event.tr_af,
    tr_total: event.tr_tt,
    tr_tax: event.tr_tx,
    tr_shipping: event.tr_sh,
    tr_city: event.tr_ci,
    tr_state: event.tr_st,
    tr_country: event.tr_co,
    tr_currency: event.tr_cu,
    tr_total_base: null,
    tr_tax_base: null,
    tr_shipping_base: null,
    ti_orderid: event.ti_id,
    ti_sku: event.ti_sk,
    ti_name: event.ti_na,
    ti_category: event.ti_ca,
    ti_price: event.ti_pr,
    ti_quantity: event.ti_qu,
    ti_currency: event.ti_cu,
    ti_price_base: null
  }

}

export default transactionEnrichment

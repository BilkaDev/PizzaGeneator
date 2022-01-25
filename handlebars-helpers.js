const handlebarsHelpers = {
    'find-price': (entries,chossenAddon) => {
        const found = entries.find(el => el[0] === chossenAddon)
        if (!found){
            throw new Error(`Cannot find price of "${chossenAddon}".`)
        }
        const [, price] = found;
        return price;
    },

    pricify: price => price.toFixed(2),
}

module.exports = {
    handlebarsHelpers,
}
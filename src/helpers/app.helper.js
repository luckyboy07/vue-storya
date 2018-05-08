export default {
    Enumerable: require('linq'),

    /**
     * Generates a unique Global Unique Identifier
     */
    generateGUID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    // Checks if the given Uniform Resource Identifier (URI) is valid
    isValidURI: function(uri) {
        return true;
        // if (uri) {
        //   if (uri.match(/\.(jpeg|jpg|gif|png)$/) === null) {
        //     return false
        //   }
        // }
        // return true
    },
    // Checks if the inputted data is digit
    isDigit: function(charCode, val, checkDecimal) {
        // only allow one (1) period (.) in
        if (charCode === 110 && checkDecimal) {
            if (val.indexOf('.') === -1) {
                return true
            }
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            window.event.preventDefault()
        } else {
            return true
        }
    },
    // creates a new layer
    createLayer: function(_layerDetail) {
        let layerDetail = JSON.parse(JSON.stringify(_layerDetail))
            // assign id for this layer and to its attributes to prevent data errors
        layerDetail.id = this.generateGUID()
            // layerDetail.attributes =  Vue.util.extend([], _layerDetail.attributes);
        for (let i = 0; i < layerDetail.attributes.length; i++) {
            layerDetail.attributes[i].id = this.generateGUID()
        }
        // make the newly added layer as the first item when sorting
        layerDetail.order = 1

        return layerDetail
    },
    // Sorts app layers ascending base on order property
    sortLayersAscending: function(_array) {
        return _array.sort((a, b) => a.order > b.order)
    },
    // Sorts app layers descending base on order property
    sortLayersDescending: function(_array) {
        return _array.sort((a, b) => a.order < b.order)
    },
    /**
     * Applies a value to the specified property
     * @param  {} _layerDetail the selected layer
     * @param  {} _prop the name of the property
     * @param  {} _propValue the property value
     */
    applyPropertyValue: function(_layerDetail, _prop, _propValue) {
        // to avoid updating the editors layers/panels (to be implemented)
        // let requestUpdate = true;
        // I intentionally separates area
        // since it has two attributes (width and height)
        // change this for more optimized solution ;)
        let prop = null
        if (_prop === 'width' || _prop === 'height') {
            prop = this.Enumerable.from(_layerDetail.attributes)
                .firstOrDefault(x => x.name === 'area')
            if (prop) {
                // bang: attribute found
                // here apply the attribute
                if (_prop == 'width') {
                    prop.width = _propValue
                    prop.width = prop.width.replace(prop.unit, '')
                    _layerDetail.width = parseInt(prop.width)
                } else {
                    prop.height = _propValue
                    prop.height = prop.height.replace(prop.unit, '')
                    _layerDetail.height = parseInt(prop.height)
                }
            }
        } else {
            // get the attribute and change its value
            // check if the _layerDetail has the attribute
            prop = this.Enumerable.from(_layerDetail.attributes)
                .firstOrDefault(x => x.name === _prop)
                // console.log('prop', prop);
            if (prop) {
                // bang: attribute found
                // here apply the attribute
                prop.value = _propValue
                    // verify values if content type is number
                if (prop.content_type === 'number') {
                    prop.value = prop.value.replace(/\D/g, '')
                }
            }
        }
    },
    // Removes a layer
    removeLayer(_sourceLayers, _defaultIndex, _layerId) {
        let removeIndex = _defaultIndex
        if (_layerId) {
            for (let i = 0; i < _sourceLayers.length; i++) {
                if (_sourceLayers.id === _layerId) {
                    removeIndex = i
                    break
                }
            }
        }

        if (_sourceLayers[removeIndex]) {
            _sourceLayers.splice(removeIndex, 1)
        }
    },
    /**
     * Generates a timestamp of the current date and time
     */
    generateTimestamp() {
        var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now()
        return (timeStampInMs, Date.now())
    },
}
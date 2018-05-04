import ImageLayer from './image'
import ShapeLayer from './shape'
import ShapeSvgLayer from './shapesvg'
import TextLayer from './text'
const components = {
    ImageLayer,
    ShapeLayer,
    ShapeSvgLayer,
    TextLayer
}
const install = function (Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
  }
  export default {
    install
  }
  
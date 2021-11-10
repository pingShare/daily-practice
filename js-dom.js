// 由js对象创建dom对象
export default class Element {
    constructor(tag, props, children, key) {
        this.tag = tag
        this.props = props
        if (Array.isArray(children)) {
            this.children = children
        } else  if (isString(children)) {
            this.key = children
            this.children = null
        }
        if (key) this.key = key
    }
    // 渲染
    render() {
        let root = this._createElement(
            this.tag,
            this.props,
            this.children,
            this.key
        )
        document.body.appendChild(root)
        return root
    }
    create() {
        return this._createElement(this.tag, this.props, this.children, this.key)
    }
    // 创建节点
    _createElement(tag, props, children, key) {
        // 通过tag创建节点
        let el = document.createElement(tag)
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                const value = props[key]
                el.setAttribute(key, value)
            }
        }
        if (key) {
            el.setAttribute('key', key)
        }
        // 递归添加子节点
        if (children) {
            children.forEach(element => {
                let child
                if (element instanceof Element) {
                    child = this._createElement(
                        element.tag,
                        element.props,
                        element.children,
                        element.key
                    )
                } else {
                    child = document.createTextNode(element)
                }
                el.appendChild(child)
            })
        }
    }
}
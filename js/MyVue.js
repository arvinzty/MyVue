//入口
class MyVue {

  constructor (option) {
    this.$el = option.el;
    this.$data = option.data;
    this.$option = option;
    if (this.$el) {
      //编译el节点
      new compile(this.$el,this)
    }
  }
}

class compile {

  constructor (el,vm) {
    //找到el节点
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //获取文档碎片对象
    const fragment = this.node2fragment(this.el);
    //编译模板
    this.compile(fragment)
    this.el.appendChild(fragment);
  }

  isElementNode (node) {
    return node.nodeType === 1;
  }

  node2fragment (node) {
    const fragment = document.createDocumentFragment();
    while (node.firstChild) {
      fragment.appendChild(node.firstChild);
    }
    return fragment;
  }

  compile (fragment) {
    const nodes = fragment.childNodes;
    [...nodes].forEach(child => {
      if (this.isElementNode(child)) {
        //元素节点
        // console.log('元素节点',child)
        this.compileElement(child)
      }else {
        //文本节点
        // console.log('文本节点',child)
        // this.compileText(child)
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    });
  }

  compileElement (node) {
    console.log(node);
    const attributes = node.attributes;
    console.log(attributes)

  }

  compileText (node) {
    // console.log(node)
  }
}
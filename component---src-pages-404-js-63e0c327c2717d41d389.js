(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{149:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",function(){return u});var a=n(7),r=n.n(a),o=n(0),i=n.n(o),s=n(156),c=n(157),l=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t=this.props.data.site.siteMetadata.title;return i.a.createElement(s.a,{location:this.props.location,title:t},i.a.createElement(c.a,{title:"404: Not Found"}),i.a.createElement("h1",null,"Not Found"),i.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},e}(i.a.Component);e.default=l;var u="1097489062"},152:function(t,e,n){"use strict";n.d(e,"b",function(){return u});var a=n(0),r=n.n(a),o=n(4),i=n.n(o),s=n(33),c=n.n(s);n.d(e,"a",function(){return c.a});n(154);var l=r.a.createContext({}),u=function(t){return r.a.createElement(l.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},153:function(t,e,n){"use strict";n.d(e,"a",function(){return c}),n.d(e,"b",function(){return l});var a=n(164),r=n.n(a),o=n(165),i=n.n(o);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var s=new r.a(i.a);var c=s.rhythm,l=s.scale},154:function(t,e,n){var a;t.exports=(a=n(155))&&a.default||a},155:function(t,e,n){"use strict";n.r(e);n(34);var a=n(0),r=n.n(a),o=n(4),i=n.n(o),s=n(55),c=n(2),l=function(t){var e=t.location,n=c.default.getResourcesForPathnameSync(e.pathname);return n?r.a.createElement(s.a,Object.assign({location:e,pageResources:n},n.json)):null};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},e.default=l},156:function(t,e,n){"use strict";n(34);var a=n(7),r=n.n(a),o=n(0),i=n.n(o),s=n(152),c=n(153),l=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t,e=this.props,n=e.location,a=e.title,r=e.children;return t="/"===n.pathname?i.a.createElement("h1",{style:Object.assign({},Object(c.b)(1.5),{marginBottom:Object(c.a)(1.5),marginTop:0})},i.a.createElement(s.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(s.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},a)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(c.a)(24),padding:Object(c.a)(1.5)+" "+Object(c.a)(.75)}},i.a.createElement("header",null,t),i.a.createElement("main",null,r),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},e}(i.a.Component);e.a=l},157:function(t,e,n){"use strict";var a=n(158),r=n(0),o=n.n(r),i=n(4),s=n.n(i),c=n(166),l=n.n(c);function u(t){var e=t.description,n=t.lang,r=t.meta,i=t.keywords,s=t.title,c=a.data.site,u=e||c.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:s},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:u}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})}u.defaultProps={lang:"en",meta:[],keywords:[],description:""},u.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.arrayOf(s.a.object),keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},e.a=u},158:function(t){t.exports={data:{site:{siteMetadata:{title:"sql-in-js",description:"\n      This is maybe my 10th attempt at a blog. \n      All I want is a place to put my thoughts. \n      I'm writing for me not you. \n      That's what I'm telling myself this time hope this works.",author:"Rick Bergfalk"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-63e0c327c2717d41d389.js.map
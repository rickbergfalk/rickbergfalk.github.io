---
title: Bundle Battle 2 - react-virtualized, react-window
date: "2019-04-29"
description: Making SQLPad smaller with react-window
---

_This post is part of a series detailing the work involved to slim down SQLPad's JavaScript bundle size. [Read the introductory post](/posts/20190428-bundle-battle/)._

[React-virtualized](https://github.com/bvaughn/react-virtualized) by Brian Vaughn is a collection of lower level components to help efficiently render large lists and tables (thousands of rows) without crushing React or the browser. This is primarily for applications where you do not want to paginate your data, and instead show all of it. Perfect for an app that renders a large table of SQL query results!

It was initially brought into SQLPad to assist in building a custom data grid component to replace [fixed-data-table-2](https://github.com/schrodinger/fixed-data-table-2) which itself was a continuation of the abandoned fixed-data-table component. At the time there were some performance issues and other quirks, so I decided to build my own data grid with react-virtualized.

Fortunately for me Brian is already on top of things, and has created [react-window](https://github.com/bvaughn/react-window), an amazing spiritual successor of sorts to react-virtualized. It is a complete rewrite of react-virtualized with [a focus on making it smaller and faster, as well as improving the API](https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized).

[Swapping out react-virtualized for react-window](https://github.com/rickbergfalk/sqlpad/pull/427/files) shaved ~100 KB off the build (minified, uncompressed).

The data grid still feels fast, and I can vouch for the better API. The limitation of features has simplified the implementation and its really nice to work with.

Thanks Brian!

```
              bundle  ~2.68 MB
-  react-virtualized  ~0.12 MB
+       react-window  ~0.02 MB
-------------------------------
          new bundle  ~2.58 MB
```

![Bundle minus react-virtualized](./bundle-20190429.png)

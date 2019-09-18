export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, 'merge', {
      value: (a, b) => {
        function MergeRecursive(o1, o2) {
          const o3 = o1;
          Object.keys(o2).forEach((p) => {
            try {
              if (o2[p].constructor === Object) {
                o3[p] = MergeRecursive(o3[p], o2[p]);
              } else if (o2[p].constructor === Array) {
                for (let i = 0; i < o2[p].length; i += 1) {
                  o3[p][i] = o2[p][i];
                }
              } else {
                o3[p] = o2[p];
              }
            } catch (e) {
              o3[p] = o2[p];
            }
          });
          return o3;
        }

        // Merge Arrays
        if (a.constructor === Array && b.constructor === Array) {
          return [...new Set([].concat(...[a, b]))];
        }
        // Merge Objects
        const o1 = Object.assign({}, a);
        const o2 = Object.assign({}, b);
        MergeRecursive(o1, o2);
        return o1;
      },
    });
  },
};

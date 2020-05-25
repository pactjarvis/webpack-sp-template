module.exports = function (api) {
    api.cache(true);
  
    const presets = [ 
        // '@babel/preset-env',
        '@babel/preset-typescript', 
    ];
    const plugins = [ 
        // ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        // ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        // '@babel/plugin-proposal-numeric-separator',
        // '@babel/plugin-proposal-optional-chaining',
        // '@babel/plugin-proposal-nullish-coalescing-operator',
        // '@babel/proposal-object-rest-spread',
    ];
  
    return {
      presets,
      plugins
    };
}
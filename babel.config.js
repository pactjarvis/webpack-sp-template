module.exports = function (api) {
    api.cache(true);
  
    const presets = [ 
        '@babel/preset-typescript', 
        '@babel/preset-env',
    ];
    const plugins = [ 
        '@babel/plugin-proposal-numeric-separator',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ];
  
    return {
      presets,
      plugins
    };
}
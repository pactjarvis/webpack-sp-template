module.exports = function (api) {
    api.cache(true);
  
    const presets = [ 
        '@babel/preset-typescript', 
        '@babel/preset-env',
    ];
    const plugins = [ 
        '@babel/plugin-proposal-numeric-separator',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread' 
    ];
  
    return {
      presets,
      plugins
    };
}
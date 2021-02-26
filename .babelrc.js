module.exports = (api) => {
	api.cache(true);
  
	const presets = ['@babel/env', '@babel/typescript'];
	const plugins = [["@babel/transform-runtime"]];
  
	return {
	  presets,
	  plugins,
	};
  };
  
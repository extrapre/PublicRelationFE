const remoteConfigPath = (path, screenKey) => {
  let config = {};
  //alert("dev package :"+ path +" : "+ screenKey)
  switch (path) {
	 case "egov-pr":
      config = require(`egov-pr/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    default:
      config = require(`ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
  }
  return config;
};

export default remoteConfigPath;

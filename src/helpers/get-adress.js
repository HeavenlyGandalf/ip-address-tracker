import  config from '../../config'

export async function getAddress(ip = '8.8.8.8'){
	const response = await fetch(config.apiKeyGeoIpify + `=${ip}`);
	return await response.json();
}

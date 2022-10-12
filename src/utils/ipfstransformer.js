/**
 * Transforms ipfs from backend to a readable hash on IPFS gateways
 *
 * @param {string} ipfsString The IPFS string (ipfs://hash)
 * @return {string} The transformed string (ipfs/hash)
 */
export const convertIpfs = (ipfsString) => ipfsString.split(":/").join("");

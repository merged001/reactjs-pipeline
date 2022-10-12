import axios from "axios";

export const getDirectBuyList = async () => {
  return axios.get("/getDirectList");
};

export const getAuctionList = async () => {
  return axios.get("/getAuctionList");
};

export const getNFTDetailsList = async (walletAddress) => {
  return axios.post(`/getNFTDetailsList`,{walletAddress});
};


export const getUserDetails = async (walletAddress) => {
  return axios.post(`/getUserDetails`,{walletAddress});
};

export const saveUserDetails = async (data) => {
  return axios.post(`/saveDetails`,data);
};
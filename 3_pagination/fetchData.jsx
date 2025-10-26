import API_URL from "../constant/Api";
async function fetchData() {
  try {
    const data = await fetch(API_URL); //got readable stream data
    const response = await data.json(); // convert it into json format
    return response; //return a promise(async always do) containing json data
  } catch (err) {
    console.error(err);
    return { products: [] };
  }
}
export default fetchData;

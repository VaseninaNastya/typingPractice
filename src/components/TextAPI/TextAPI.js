class TextAPI {
  constructor() {
    this.API_SERVER = 'https://baconipsum.com/api/';
  }
  /*  Users   */
  async text() {
    return fetch(this.API_SERVER + '?type=all-meat&paras=2' , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default TextAPI;

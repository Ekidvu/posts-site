class Api {
    #baseUrl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponce(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()])
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    getPostsList() {
        return fetch(`${this.#baseUrl}/v2/group-11/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    getPostById(postID) {
        return fetch(`${this.#baseUrl}/posts/${postID}`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    changeCommentById(postID, updateData, commentId) {
        console.log(postID, updateData);
        return fetch(`${this.#baseUrl}/posts/comments/${postID}`, {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(updateData)
        })
            .then(this.#onResponce)
    }

    createPost(postData) {
        return fetch(`${this.#baseUrl}/posts/`, {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(postData)
        })
            .then(this.#onResponce)
    }

    // changePostById(postID, updateData) {
    //     console.log(postID, updateData);
    //     return fetch(`${this.#baseUrl}/posts/${postID}`, {
    //         method: "PATCH",
    //         headers: this.#headers,
    //         body: JSON.stringify({updateData})
    //     })
    //         .then(this.#onResponce)
    // }

    changeLikePostStatus(postID, like) {
        return fetch(`${this.#baseUrl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponce)
    }

    // search(searchQuery) {
    //     return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
    //         headers: this.#headers
    //     })
    //         .then(this.#onResponce)
    // }

    // setUserInfo({name, about}) {
    //     return fetch(`${this.#baseUrl}/users/me`, {
    //         method: 'PATCH',
    //         headers: this.#headers,
    //         body: JSON.stringify({name, about})
    //     })
    //         .then(this.#onResponce)
    // }

    // changeLikeProductStatus(productID, like) {
    //     return fetch(`${this.#baseUrl}/products/likes/${productID}`, {
    //         method: like ? 'DELETE' : 'PUT',
    //         headers: this.#headers,
    //     })
    //         .then(this.#onResponce)
    // }  



    // getInfoProduct(idProduct) {
    //     return Promise.all([this.getProductById(idProduct), this.getUserInfo()])
    // }
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4YTgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQzLCJleHAiOjE3MTAzMzg0NDN9.vWpyVuDwcr2p5NJW6DekvOaNxKfdrAGN6ndwX7fTqwc',
    }
})

export default api




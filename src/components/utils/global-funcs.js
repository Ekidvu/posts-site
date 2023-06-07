import api from "./api.js";

export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const currentPost = (postBase, clickedPostID) => postBase.find(e => e._id === clickedPostID);

export const autoHeight = (el) => {
    el.style.height = "1px";
    el.style.height = (el.scrollHeight + 3) + "px";
}

export const parseTags = (tags) => {
    const parsedTags = tags.length === 1 
        ? tags.join('').split(/\s|#/g).filter(e=>e).map(tag => `#${tag} `) 
        : tags.map(tag => "#" + tag.trim().replace(/\s/g, '_').replace(/#/g, '') + " ")
    return parsedTags
}

// export const last4signs = () => {
//     const der = (alphLen=26, charCode=65) => Math.floor(Math.random()*alphLen) + charCode;
//     const randomLetter = () => String.fromCharCode(der());
//     return randomLetter() + randomLetter() + der(90,10)
// }

// const commentId = (postID, postComments) => {
//     const randomID = () => postID.slice(0, -4) + last4signs();
//     let newCommentID = '';
//     let match = false;
//     while (!match) {
//         let probs = randomID();
//         if(postComments.every(comment => comment._id !== probs)) {
//             newCommentID = probs;
//             match = true;
//         }
//     }
//     return newCommentID  
// }

/*----- variables ------*/

export const pageSize = 15;





// const service = {
//     getData: ({from, to}) => {

//         const data = postBase.slice(from, to);

//         return new Promise((resolve,reject) => {
//             resolve({
//                 count: postBase.length,
//                 data: data
//             })
//         })
//     }
// }

// export default service
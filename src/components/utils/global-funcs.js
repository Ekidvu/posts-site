
export const isLiked = (likes, userId) => likes?.some(id => id === userId);

export const currentPost = (postBase, clickedPostID) => postBase.find(e => e._id === clickedPostID);
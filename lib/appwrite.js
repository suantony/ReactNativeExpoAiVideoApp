import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.suantony.aora',
  projectId: '66f1a89c00003d1bfe41',
  databaseId: '66f26f85000580a4a92c',
  userCollectionId: '66f26fb90024f77455dd',
  videoCollectionId: '66f2701000302522d273',
  storageId: '66f2749c0027b2c976c1',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {accountId: newAccount.$id, email, username, avatar: avatarUrl},
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc('$createdAt'),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc('$createdAt', Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllAndLatestPosts = async () => {
  try {
    const resultAllPost = await getAllPosts();
    const resultLatestPost = await getLatestPosts();
    const mixedPost = {
      all: resultAllPost,
      latest: resultLatestPost,
    };
    return mixedPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async query => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search('title', query),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async userId => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal('creator', userId),
      Query.orderDesc('$createdAt'),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSavedPosts = async (userId, query) => {
  try {
    let arrayOfQueries = [
      Query.contains('saved', userId),
      Query.orderDesc('$createdAt'),
    ];
    if (query) arrayOfQueries.push(Query.search('title', query));

    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      arrayOfQueries,
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        'top',
        100,
      );
    } else {
      throw new Error('Invalide file type');
    }

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.type,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset,
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createVideo = async form => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSavedVideo = async (savedByUserArray, formId) => {
  try {
    const result = await databases.updateDocument(
      databaseId,
      videoCollectionId,
      formId,
      {
        saved: savedByUserArray,
      },
    );
    return result;
  } catch (error) {
    throw new error(error);
  }
};
